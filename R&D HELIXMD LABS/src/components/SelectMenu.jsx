import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

export default function SelectMenu({
  id,
  value,
  onChange,
  options,
  placeholder,
  emptyLabel,
  error,
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const typed = useRef({ text: "", at: 0 });

  const items = useMemo(
    () => [
      ...(emptyLabel ? [{ value: "", label: emptyLabel }] : []),
      ...options.map((option) => ({ value: option, label: option })),
    ],
    [emptyLabel, options],
  );

  const selectedIndex = items.findIndex((item) => item.value === value);
  const label = selectedIndex >= 0 ? items[selectedIndex].label : "";

  const openMenu = (startAt = selectedIndex >= 0 ? selectedIndex : 0) => {
    setActive(startAt);
    setOpen(true);
  };

  const close = ({ refocus = true } = {}) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  };

  const choose = (index) => {
    const item = items[index];
    if (!item) return;
    onChange(id, item.value);
    close();
  };

  // Dismiss on an outside press. mousedown, not click, so it beats the
  // button's own onClick and doesn't immediately reopen the panel.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  // Keep the highlighted row in view — the state list is 51 rows deep.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const handleKeyDown = (event) => {
    const { key } = event;

    if (!open) {
      if (key === "ArrowDown" || key === "ArrowUp" || key === "Enter" || key === " ") {
        event.preventDefault();
        openMenu();
      }
      return;
    }

    if (key === "Escape") {
      event.preventDefault();
      close();
    } else if (key === "Tab") {
      close({ refocus: false });
    } else if (key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, items.length - 1));
    } else if (key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (key === "Home") {
      event.preventDefault();
      setActive(0);
    } else if (key === "End") {
      event.preventDefault();
      setActive(items.length - 1);
    } else if (key === "Enter" || key === " ") {
      event.preventDefault();
      choose(active);
    } else if (key.length === 1 && !event.metaKey && !event.ctrlKey) {
      // Type-ahead: letters typed in quick succession build one query.
      const now = Date.now();
      typed.current.text = now - typed.current.at > 600 ? key : typed.current.text + key;
      typed.current.at = now;
      const query = typed.current.text.toLowerCase();
      const match = items.findIndex((item) =>
        item.label.toLowerCase().startsWith(query),
      );
      if (match >= 0) setActive(match);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={handleKeyDown}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm outline-none transition-colors ${
          open ? "bg-white" : "bg-ice"
        } ${label ? "text-navy" : "text-body-soft/70"} ${
          error
            ? "border-red-400"
            : open
              ? "border-brand-cyan"
              : "border-line hover:border-brand-cyan/50"
        }`}
      >
        <span className="truncate">{label || placeholder}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="shrink-0 text-body-soft"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={id}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top center" }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-60 overflow-y-auto overscroll-contain rounded-xl border border-line bg-white p-1.5 shadow-[0_24px_50px_-20px_rgba(22,48,92,0.35)]"
          >
            {items.map((item, index) => {
              const isActive = index === active;
              const isSelected = item.value === value;
              return (
                <li
                  key={item.value || "__empty"}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  data-active={isActive}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(index)}
                  className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    isActive ? "bg-ice-100 text-navy" : "text-body"
                  } ${isSelected ? "font-semibold text-navy" : ""}`}
                >
                  <span className="truncate">{item.label}</span>
                  {isSelected && (
                    <Check size={14} className="shrink-0 text-brand-cyan-deep" />
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
