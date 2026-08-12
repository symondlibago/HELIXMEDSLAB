import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CircleAlert,
  Loader2,
  MailCheck,
  User,
} from "lucide-react";
import HelixWave from "../components/HelixWave";
import SelectMenu from "../components/SelectMenu";
import Footer from "../components/Footer";
import {
  ACCOUNT_TYPES,
  BUSINESS_TYPES,
  HEARD_FROM,
  MONTHLY_VOLUMES,
  REFERRAL_TEAMS,
  REVIEW_WINDOW_HOURS,
  US_STATES,
} from "../data/registrationConfig";
import { submitRegistration } from "../lib/submitRegistration";

const STEPS = ["Account type", "Your details", "Review & submit"];

const EMPTY = {
  accountType: "",
  referralTeam: "",
  referralRep: "",
  referralCode: "",
  heardFrom: "",

  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",

  businessName: "",
  businessType: "",
  taxId: "",
  licenseNumber: "",
  monthlyVolume: "",
  website: "",

  researchUse: "",

  agreeResearch: false,
  agreeAge: false,
  agreeTerms: false,
  marketingOptIn: false,
};

const REQUIRED = "Required";
const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
const digits = (value) => value.replace(/\D/g, "");

/* Errors are keyed by field name so the inputs can look themselves up. */
function validateStep(step, v) {
  const e = {};

  if (step === 0) {
    if (!v.accountType) e.accountType = "Choose the account you need";
  }

  if (step === 1) {
    if (!v.firstName.trim()) e.firstName = REQUIRED;
    if (!v.lastName.trim()) e.lastName = REQUIRED;
    if (!v.email.trim()) e.email = REQUIRED;
    else if (!isEmail(v.email)) e.email = "Enter a valid email address";
    if (!v.phone.trim()) e.phone = REQUIRED;
    else if (digits(v.phone).length < 10) e.phone = "Enter a full phone number";
    if (!v.address1.trim()) e.address1 = REQUIRED;
    if (!v.city.trim()) e.city = REQUIRED;
    if (!v.state) e.state = REQUIRED;
    if (!v.zip.trim()) e.zip = REQUIRED;
    else if (digits(v.zip).length < 5) e.zip = "Enter a 5-digit ZIP";
  }

  if (step === 2) {
    if (v.accountType === "wholesale") {
      if (!v.businessName.trim()) e.businessName = REQUIRED;
      if (!v.businessType) e.businessType = REQUIRED;
      if (!v.taxId.trim()) e.taxId = REQUIRED;
      if (!v.monthlyVolume) e.monthlyVolume = REQUIRED;
    } else if (v.researchUse.trim().length < 15) {
      e.researchUse = "Tell us a little about your intended use";
    }

    if (!v.agreeResearch) e.agreeResearch = "Please confirm this to continue";
    if (!v.agreeAge) e.agreeAge = "Please confirm this to continue";
    if (!v.agreeTerms) e.agreeTerms = "Please accept the terms to continue";
  }

  return e;
}

/* ─────────────────────────── field primitives ─────────────────────────── */

const CONTROL =
  "w-full rounded-xl border bg-ice px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-body-soft/70 focus:bg-white";

function FieldShell({ id, label, hint, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-body-soft"
      >
        {label}
        {hint && (
          <span className="ml-2 font-medium normal-case tracking-normal text-body-soft/80">
            {hint}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-red-600"
        >
          <CircleAlert size={13} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function Field({ id, label, hint, error, value, onChange, ...rest }) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        name={id}
        value={value}
        onChange={(event) => onChange(id, event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${CONTROL} ${
          error ? "border-red-400 focus:border-red-500" : "border-line focus:border-brand-cyan"
        }`}
        {...rest}
      />
    </FieldShell>
  );
}

function SelectField({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  options,
  placeholder,
  emptyLabel,
}) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <SelectMenu
        id={id}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        emptyLabel={emptyLabel}
        error={error}
      />
    </FieldShell>
  );
}

function CheckRow({ id, checked, onChange, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-[13px] leading-relaxed transition-colors sm:p-4 ${
          error
            ? "border-red-300 bg-red-50/60 text-body"
            : "border-line bg-ice text-body hover:border-brand-cyan/50"
        }`}
      >
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(id, event.target.checked)}
          aria-invalid={Boolean(error)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-brand-cyan"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-red-600">
          <CircleAlert size={13} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────── page ─────────────────────────────────── */

export default function Register() {
  const lenis = useLenis();
  const formTop = useRef(null);

  const [step, setStep] = useState(0);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [submitError, setSubmitError] = useState("");

  const isWholesale = values.accountType === "wholesale";

  const selectedTeam = useMemo(
    () => REFERRAL_TEAMS.find((team) => team.name === values.referralTeam),
    [values.referralTeam],
  );

  const set = (name, value) => {
    setValues((prev) => {
      // Picking a different team invalidates whoever was chosen under the old one.
      if (name === "referralTeam") return { ...prev, referralTeam: value, referralRep: "" };
      return { ...prev, [name]: value };
    });
    // Clear the error as soon as the field is touched — re-checked on Next.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const scrollToForm = () => {
    const target = formTop.current;
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -96, duration: 0.7 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  const goNext = () => {
    const found = validateStep(step, values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    setStep((s) => s + 1);
    scrollToForm();
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
    scrollToForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (step < STEPS.length - 1) return goNext();

    const found = validateStep(step, values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setStatus("sending");
    setSubmitError("");
    try {
      await submitRegistration(values);
      setStatus("done");
      scrollToForm();
    } catch (error) {
      setStatus("error");
      setSubmitError(
        error?.message || "We couldn’t submit that. Please try again in a moment.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ─────────────────────── HEADER ─────────────────────── */}
      <section
        className="relative overflow-hidden px-6 pb-12 pt-16 text-center md:pb-14"
        style={{
          backgroundImage:
            "radial-gradient(70% 80% at 50% -10%, #e2eff9 0%, #f4f9fd 45%, #ffffff 78%)",
        }}
      >
        <HelixWave
          uid="register-wave"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 w-full opacity-55"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cyan-deep">
            Client registration
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Let’s set up your account
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-body md:text-base">
            HelixMD Labs supplies research-grade peptides to qualified
            laboratories and practices. Registration takes a couple of minutes
            and every account is reviewed before it goes live.
          </p>
        </motion.div>
      </section>

      {/* ─────────────────────── FORM ─────────────────────── */}
      <section ref={formTop} className="mx-auto max-w-3xl scroll-mt-24 px-4 pb-16 sm:px-6 md:pb-24">
        {status === "done" ? (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="rounded-3xl border border-line bg-white p-7 text-center shadow-lg shadow-navy/5 sm:p-12"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/12 text-brand-teal">
              <MailCheck size={26} />
            </span>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Registration received
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-body sm:text-[15px]">
              Thanks, {values.firstName.trim() || "there"}. Please allow up to{" "}
              {REVIEW_WINDOW_HOURS} hours for your{" "}
              <strong className="font-semibold text-navy">
                {isWholesale ? "wholesale" : "retail"}
              </strong>{" "}
              account to be reviewed. Once it’s approved we’ll email{" "}
              <strong className="font-semibold text-navy">
                {values.email.trim().toLowerCase()}
              </strong>{" "}
              a link to set your password.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/products"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-6 text-[13px] font-semibold text-white shadow-sm shadow-navy/20 transition-colors hover:bg-navy-600 sm:text-sm"
              >
                Browse the catalog <ArrowRight size={15} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-white px-6 text-[13px] font-semibold text-navy transition-colors hover:border-brand-cyan hover:text-brand-cyan-deep sm:text-sm"
              >
                Contact our team
              </Link>
            </div>
          </motion.div>
        ) : (
          <>
            {/* ── stepper ── */}
            <ol className="mb-6 flex items-center gap-2 sm:gap-3">
              {STEPS.map((label, index) => {
                const done = index < step;
                const current = index === step;
                return (
                  <li key={label} className="flex min-w-0 flex-1 flex-col gap-2">
                    <span
                      className={`h-1 rounded-full transition-colors duration-300 ${
                        done || current ? "bg-brand-cyan" : "bg-line"
                      }`}
                    />
                    <span
                      className={`truncate text-[11px] font-semibold transition-colors sm:text-[12px] ${
                        current ? "text-navy" : "text-body-soft"
                      }`}
                    >
                      <span className="tabular-nums">{index + 1}.</span> {label}
                    </span>
                  </li>
                );
              })}
            </ol>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-line bg-white p-5 shadow-lg shadow-navy/5 sm:p-8 md:p-10"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  {/* ─────────── STEP 1 — account type + referral ─────────── */}
                  {step === 0 && (
                    <div>
                      <h2 className="text-lg font-bold tracking-tight text-navy sm:text-xl">
                        Which account do you need?
                      </h2>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-body">
                        This sets the pricing you’ll see once you’re approved.
                        You can ask us to switch later.
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
                        {ACCOUNT_TYPES.map((type) => {
                          const active = values.accountType === type.slug;
                          return (
                            <button
                              key={type.slug}
                              type="button"
                              onClick={() => set("accountType", type.slug)}
                              aria-pressed={active}
                              className={`flex h-full flex-col rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                                active
                                  ? "border-brand-cyan bg-brand-cyan/5 shadow-[0_18px_40px_-28px_rgba(23,168,224,0.8)]"
                                  : "border-line bg-white hover:border-brand-cyan/50"
                              }`}
                            >
                              <span className="flex items-center gap-2.5">
                                <span
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                    active
                                      ? "bg-brand-cyan text-white"
                                      : "bg-ice-200 text-brand-cyan-deep"
                                  }`}
                                >
                                  {type.slug === "wholesale" ? (
                                    <Building2 size={16} />
                                  ) : (
                                    <User size={16} />
                                  )}
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-bold text-navy">
                                    {type.label}
                                  </span>
                                  <span className="block text-[11px] text-body-soft">
                                    {type.tagline}
                                  </span>
                                </span>
                              </span>

                              <span className="mt-3 block text-[13px] leading-relaxed text-body">
                                {type.blurb}
                              </span>

                              <ul className="mt-3 space-y-1.5">
                                {type.points.map((point) => (
                                  <li
                                    key={point}
                                    className="flex items-start gap-2 text-[12px] text-body"
                                  >
                                    <Check
                                      size={13}
                                      className="mt-0.5 shrink-0 text-brand-teal"
                                    />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </button>
                          );
                        })}
                      </div>

                      {errors.accountType && (
                        <p className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-red-600">
                          <CircleAlert size={13} className="shrink-0" />
                          {errors.accountType}
                        </p>
                      )}

                      <div className="mt-8 border-t border-line pt-7">
                        <h3 className="text-sm font-bold text-navy">
                          Were you referred to us?
                        </h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-body">
                          Optional — it just makes sure your account lands with
                          the right person.
                        </p>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          {REFERRAL_TEAMS.length > 0 && (
                            <>
                              <SelectField
                                id="referralTeam"
                                label="Referring team"
                                value={values.referralTeam}
                                onChange={set}
                                options={REFERRAL_TEAMS.map((team) => team.name)}
                                placeholder="Not referred / none"
                                /* clearing this is a real answer, not just a
                                   prompt — so it gets its own row */
                                emptyLabel="Not referred / none"
                              />
                              {/* only worth asking once a team with a roster is picked */}
                              {selectedTeam?.reps?.length > 0 && (
                                <SelectField
                                  id="referralRep"
                                  label="Who referred you?"
                                  value={values.referralRep}
                                  onChange={set}
                                  options={selectedTeam.reps}
                                  placeholder="Select a name"
                                />
                              )}
                            </>
                          )}

                          <Field
                            id="referralCode"
                            label="Referral code"
                            hint="if you have one"
                            value={values.referralCode}
                            onChange={set}
                            placeholder="e.g. HELIX-1234"
                            autoComplete="off"
                          />

                          <SelectField
                            id="heardFrom"
                            label="How did you hear about us?"
                            value={values.heardFrom}
                            onChange={set}
                            options={HEARD_FROM}
                            placeholder="Select an option"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─────────────── STEP 2 — contact details ─────────────── */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-lg font-bold tracking-tight text-navy sm:text-xl">
                        Your details
                      </h2>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-body">
                        We use this to verify the account and to ship orders once
                        you’re approved.
                      </p>

                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <Field
                          id="firstName"
                          label="First name"
                          value={values.firstName}
                          onChange={set}
                          error={errors.firstName}
                          placeholder="Jane"
                          autoComplete="given-name"
                        />
                        <Field
                          id="lastName"
                          label="Last name"
                          value={values.lastName}
                          onChange={set}
                          error={errors.lastName}
                          placeholder="Doe"
                          autoComplete="family-name"
                        />
                        <Field
                          id="email"
                          label="Email"
                          type="email"
                          value={values.email}
                          onChange={set}
                          error={errors.email}
                          placeholder="jane@lab.org"
                          autoComplete="email"
                        />
                        <Field
                          id="phone"
                          label="Phone"
                          type="tel"
                          value={values.phone}
                          onChange={set}
                          error={errors.phone}
                          placeholder="(555) 123-4567"
                          autoComplete="tel"
                        />
                      </div>

                      <div className="mt-7 border-t border-line pt-6">
                        <h3 className="text-sm font-bold text-navy">
                          Shipping address
                        </h3>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <Field
                              id="address1"
                              label="Street address"
                              value={values.address1}
                              onChange={set}
                              error={errors.address1}
                              placeholder="120 Research Park Drive"
                              autoComplete="address-line1"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <Field
                              id="address2"
                              label="Suite, unit, floor"
                              hint="optional"
                              value={values.address2}
                              onChange={set}
                              placeholder="Suite 400"
                              autoComplete="address-line2"
                            />
                          </div>
                          <Field
                            id="city"
                            label="City"
                            value={values.city}
                            onChange={set}
                            error={errors.city}
                            placeholder="Austin"
                            autoComplete="address-level2"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <SelectField
                              id="state"
                              label="State"
                              value={values.state}
                              onChange={set}
                              error={errors.state}
                              options={US_STATES}
                              placeholder="Select"
                            />
                            <Field
                              id="zip"
                              label="ZIP"
                              inputMode="numeric"
                              value={values.zip}
                              onChange={set}
                              error={errors.zip}
                              placeholder="78701"
                              autoComplete="postal-code"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ────────── STEP 3 — business / use + agreements ────────── */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-lg font-bold tracking-tight text-navy sm:text-xl">
                        {isWholesale ? "About your business" : "About your research"}
                      </h2>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-body">
                        {isWholesale
                          ? "Wholesale accounts are verified before approval, so these details keep the review moving."
                          : "A short note on what you’ll be using the material for is all we need."}
                      </p>

                      {isWholesale ? (
                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div className="sm:col-span-2">
                            <Field
                              id="businessName"
                              label="Business name"
                              value={values.businessName}
                              onChange={set}
                              error={errors.businessName}
                              placeholder="Northgate Wellness LLC"
                              autoComplete="organization"
                            />
                          </div>
                          <SelectField
                            id="businessType"
                            label="Business type"
                            value={values.businessType}
                            onChange={set}
                            error={errors.businessType}
                            options={BUSINESS_TYPES}
                            placeholder="Select a type"
                          />
                          <Field
                            id="taxId"
                            label="Tax ID / EIN"
                            value={values.taxId}
                            onChange={set}
                            error={errors.taxId}
                            placeholder="12-3456789"
                          />
                          <Field
                            id="licenseNumber"
                            label="State license no."
                            hint="optional"
                            value={values.licenseNumber}
                            onChange={set}
                            placeholder="If your practice holds one"
                          />
                          <SelectField
                            id="monthlyVolume"
                            label="Estimated monthly volume"
                            value={values.monthlyVolume}
                            onChange={set}
                            error={errors.monthlyVolume}
                            options={MONTHLY_VOLUMES}
                            placeholder="Select a range"
                          />
                          <div className="sm:col-span-2">
                            <Field
                              id="website"
                              label="Website"
                              hint="optional"
                              value={values.website}
                              onChange={set}
                              placeholder="https://"
                              autoComplete="url"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="mt-5">
                          <FieldShell
                            id="researchUse"
                            label="Intended research use"
                            error={errors.researchUse}
                          >
                            <textarea
                              id="researchUse"
                              name="researchUse"
                              rows={5}
                              value={values.researchUse}
                              onChange={(event) => set("researchUse", event.target.value)}
                              aria-invalid={Boolean(errors.researchUse)}
                              aria-describedby={
                                errors.researchUse ? "researchUse-error" : undefined
                              }
                              placeholder="e.g. in-vitro assay development for a university lab"
                              className={`${CONTROL} resize-none ${
                                errors.researchUse
                                  ? "border-red-400 focus:border-red-500"
                                  : "border-line focus:border-brand-cyan"
                              }`}
                            />
                          </FieldShell>
                        </div>
                      )}

                      <div className="mt-7 space-y-3 border-t border-line pt-6">
                        <h3 className="text-sm font-bold text-navy">
                          Before you submit
                        </h3>

                        <CheckRow
                          id="agreeResearch"
                          checked={values.agreeResearch}
                          onChange={set}
                          error={errors.agreeResearch}
                        >
                          I confirm all materials are for laboratory research
                          use only — not for human or veterinary use, food,
                          drug, or household purposes.
                        </CheckRow>

                        <CheckRow
                          id="agreeAge"
                          checked={values.agreeAge}
                          onChange={set}
                          error={errors.agreeAge}
                        >
                          I am at least 21 years old and legally able to
                          purchase research materials in my jurisdiction.
                        </CheckRow>

                        <CheckRow
                          id="agreeTerms"
                          checked={values.agreeTerms}
                          onChange={set}
                          error={errors.agreeTerms}
                        >
                          I have read and accept the{" "}
                          <Link
                            to="/legal#terms"
                            className="font-semibold text-brand-cyan-deep underline-offset-2 hover:underline"
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            to="/legal#privacy"
                            className="font-semibold text-brand-cyan-deep underline-offset-2 hover:underline"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </CheckRow>

                        <CheckRow
                          id="marketingOptIn"
                          checked={values.marketingOptIn}
                          onChange={set}
                        >
                          Send me batch releases and new product announcements.{" "}
                          <span className="text-body-soft">Optional.</span>
                        </CheckRow>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {submitError && (
                <p className="mt-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
                  <CircleAlert size={15} className="mt-0.5 shrink-0" />
                  {submitError}
                </p>
              )}

              {/* ── step controls ── */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={status === "sending"}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-white px-5 text-[13px] font-semibold text-navy transition-colors hover:border-brand-cyan hover:text-brand-cyan-deep disabled:opacity-50 sm:text-sm"
                  >
                    <ArrowLeft size={15} />
                    Back
                  </button>
                )}

                <span className="hidden text-[12px] text-body-soft sm:ml-auto sm:inline">
                  Step {step + 1} of {STEPS.length}
                </span>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-6 text-[13px] font-semibold text-white shadow-sm shadow-navy/20 transition-colors hover:bg-navy-600 disabled:cursor-not-allowed disabled:opacity-70 sm:text-sm"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Submitting…
                    </>
                  ) : step === STEPS.length - 1 ? (
                    "Submit registration"
                  ) : (
                    <>
                      Next
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="mt-5 text-center text-[12px] leading-relaxed text-body-soft">
              Accounts are reviewed within {REVIEW_WINDOW_HOURS} hours. Already
              registered?{" "}
              <Link
                to="/contact"
                className="font-semibold text-brand-cyan-deep transition-colors hover:text-navy"
              >
                Get in touch
              </Link>
              .
            </p>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
