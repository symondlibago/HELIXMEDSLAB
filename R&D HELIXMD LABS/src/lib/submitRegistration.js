
export function toCrmPayload(values) {
  return {
    account_type: values.accountType,

    first_name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),

    address_line1: values.address1.trim(),
    address_line2: values.address2.trim(),
    city: values.city.trim(),
    state: values.state,
    postal_code: values.zip.trim(),
    country: values.country,

    referral_team: values.referralTeam,
    referral_rep: values.referralRep,
    referral_code: values.referralCode.trim().toUpperCase(),
    heard_from: values.heardFrom,

    // Wholesale-only; empty strings on a retail submission.
    business_name: values.businessName.trim(),
    business_type: values.businessType,
    tax_id: values.taxId.trim(),
    license_number: values.licenseNumber.trim(),
    monthly_volume: values.monthlyVolume,
    website: values.website.trim(),

    // Retail-only.
    research_use: values.researchUse.trim(),

    agreed_research_use: values.agreeResearch,
    agreed_of_age: values.agreeAge,
    agreed_terms: values.agreeTerms,
    marketing_opt_in: values.marketingOptIn,

    submitted_at: new Date().toISOString(),
    source: "helixmdlabs.com/register",
  };
}

/**
 * @returns {Promise<{ok: true}>} resolves on success, throws on failure —
 * the form renders whatever `Error.message` says.
 */
export async function submitRegistration(values) {
  const payload = toCrmPayload(values);

  // Stands in for the network call so the pending state is real in review.
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (import.meta.env.DEV) {
    console.info("[registration] payload ready for the CRM:", payload);
  }

  return { ok: true };
}
