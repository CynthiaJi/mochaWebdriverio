"use strict";

var titles = [
  { value: 'MR', text: 'Mr' },
  { value: 'MRS', text: 'Mrs' },
  { value: 'MS', text: 'Ms' },
  { value: 'MISS', text: 'Miss' },
  { value: 'MASTER', text: 'Master' },
  { value: '2LT', text: 'Second Lieutenant' },
  { value: 'AB', text: 'Able Seaman' },
  { value: 'ABBOT', text: 'Abbot' },
  { value: 'AC', text: 'Airman/Aircraftman' },
  { value: 'ACM', text: 'Air Chief Marshal' },
  { value: 'ADM', text: 'Admiral' },
  { value: 'AIR CDRE', text: 'Air Commodore' },
  { value: 'ALDERMAN', text: 'Alderman' },
  { value: 'AM', text: 'Air Marshal' },
  { value: 'ARCHBISHOP', text: 'Archbishop' },
  { value: 'ARCHDEACON', text: 'Archdeacon' },
  { value: 'ASSOC PROF', text: 'Associate Professor' },
  { value: 'AVM', text: 'Air Vice Marshal' },
  { value: 'BARON', text: 'Baron' },
  { value: 'BARONESS', text: 'Baroness' },
  { value: 'BISHOP', text: 'Bishop' },
  { value: 'BR', text: 'Brother' },
  { value: 'BRIG', text: 'Brigadier' },
  { value: 'CANON', text: 'Canon' },
  { value: 'CAPT', text: 'Captain' },
  { value: 'CARDINAL', text: 'Cardinal' },
  { value: 'CDRE', text: 'Commodore' },
  { value: 'CDT', text: 'Cadet' },
  { value: 'CHAP', text: 'Chaplain' },
  { value: 'CMDR', text: 'Commander' },
  { value: 'CMM', text: 'Commissioner' },
  { value: 'COL', text: 'Colonel' },
  { value: 'CONST', text: 'Constable' },
  { value: 'COUNT', text: 'Count' },
  { value: 'COUNTESS', text: 'Countess' },
  { value: 'CPL', text: 'Corporal' },
  { value: 'CPO', text: 'Chief Petty Officer' },
  { value: 'DAME', text: 'Dame' },
  { value: 'DEACON', text: 'Deacon' },
  { value: 'DEACONESS', text: 'Deaconess' },
  { value: 'DEAN', text: 'Dean' },
  { value: 'DEPUTY SUPT', text: 'Deputy Superintendent' },
  { value: 'DR', text: 'Doctor' },
  { value: 'DUCHESS', text: 'Duchess' },
  { value: 'DUKE', text: 'Duke' },
  { value: 'EARL', text: 'Earl' },
  { value: 'EF', text: 'Executor for' },
  { value: 'FLGOFF', text: 'Flying Officer' },
  { value: 'FLT LT', text: 'Flight Lieutenant' },
  { value: 'FR', text: 'Father' },
  { value: 'FSGT', text: 'Flight Sergeant' },
  { value: 'GEN', text: 'General' },
  { value: 'GNR', text: 'Gunner' },
  { value: 'GP CAPT', text: 'Group Captain' },
  { value: 'HON', text: 'Honourable' },
  { value: 'HON JUDGE', text: 'Honourable Judge' },
  { value: 'HON JUST', text: 'Honourable Justice' },
  { value: 'HRH', text: 'His/Her Royal Highness' },
  { value: 'INSP', text: 'Inspector' },
  { value: 'JUDGE', text: 'Judge' },
  { value: 'JUST', text: 'Justice' },
  { value: 'LAC', text: 'Leading Aircraftman' },
  { value: 'LACW', text: 'Leading Aircraftwoman' },
  { value: 'LADY', text: 'Lady' },
  { value: 'LBDR', text: 'Lance Bombardier' },
  { value: 'LCPL', text: 'Lance Corporal' },
  { value: 'LORD', text: 'Lord' },
  { value: 'LS', text: 'Leading Seaman' },
  { value: 'LT', text: 'Lieutenant' },
  { value: 'LT CMDR', text: 'Lieutenant Commander' },
  { value: 'LT COL', text: 'Lieutenant Colonel' },
  { value: 'LT GEN', text: 'Lieutenant General' },
  { value: 'MADAM', text: 'Madam' },
  { value: 'MAJ', text: 'Major' },
  { value: 'MAJ GEN', text: 'Major General' },
  { value: 'MATRON', text: 'Matron' },
  { value: 'MAYOR', text: 'Mayor' },
  { value: 'MAYORESS', text: 'Mayoress' },
  { value: 'MIDN', text: 'Midshipman' },
  { value: 'MON', text: 'Monsignor' },
  { value: 'MOST REV', text: 'Most Reverend' },
  { value: 'PASTOR', text: 'Pastor' },
  { value: 'PATRIARCH', text: 'Patriarch' },
  { value: 'PLT OFF', text: 'Pilot Officer' },
  { value: 'PO', text: 'Petty Officer' },
  { value: 'PRIOR', text: 'Prior' },
  { value: 'PROF', text: 'Professor' },
  { value: 'PTE', text: 'Private' },
  { value: 'RABBI', text: 'Rabbi' },
  { value: 'RADM', text: 'Rear Admiral' },
  { value: 'RECTOR', text: 'Rector' },
  { value: 'REV', text: 'Reverend' },
  { value: 'RF', text: 'Representative for' },
  { value: 'RT HON', text: 'Right Honourable' },
  { value: 'RT REV', text: 'Right Reverend' },
  { value: 'RT REV BISHOP', text: 'Right Reverend Bishop' },
  { value: 'RT REV MON', text: 'Right Reverend Monsignor' },
  { value: 'SBLT', text: 'Sub Lieutenant' },
  { value: 'SEN', text: 'Senator' },
  { value: 'SGT', text: 'Sergeant' },
  { value: 'SIR', text: 'Sir' },
  { value: 'SMN', text: 'Seaman' },
  { value: 'SNR CONST', text: 'Senior Constable' },
  { value: 'SQN LDR', text: 'Squadron Leader' },
  { value: 'SR', text: 'Sister' },
  { value: 'SSGT', text: 'Staff Sergeant' },
  { value: 'SUPR', text: 'Superintendent' },
  { value: 'SWAMI', text: 'Swami' },
  { value: 'TF', text: 'Trustee for' },
  { value: 'VADM', text: 'Vice Admiral' },
  { value: 'VERY REV', text: 'Very Reverend' },
  { value: 'VICAR', text: 'Vicar' },
  { value: 'VISCOUNT', text: 'Viscount' },
  { value: 'WG CDR', text: 'Wing Commander' },
  { value: 'WO', text: 'Warrant Officer' },
  { value: 'WO1', text: 'Warrant Officer Class 1' },
  { value: 'WO2', text: 'Warrant Officer Class 2' },
];

var nameSuffixes = ["ESQ", "II", "III", "IV", "JNR", "JP", "MHA", "MHR", "MLA", "MLC", "MP", "QC", "SNR"];
var states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

module.exports = {
  "ReportingParty.Identifiers.TaxFileNumber.Identifier": {
    "type": "number",
    "label": "Tax file number (TFN)",
    "comment": "Must be 9 digits, validation algorithm exists",
    "fieldnumber": "1"
  },
  "ReportingParty.Identifiers.AustralianBusinessNumber.Identifier": {
    "type": "number",
    "label": "Australian business number (ABN)",
    "optional": true,
    "comment": "Optional, must be 11 digits, validation algorithm exists",
    "fieldnumber": "2"
  },

  "Myob.ReportingParty.TrusteeSeniorPartner.Required": {
    "type": "boolean",
    "label": "Is the employer a trust or partnership?",
    "comment": "Not a field on the paper form"
  },

  "Myob.ReportingParty.TrusteeSeniorPartner.IndividualOrNonIndividual": {
    "type": "enum",
    "enumvalues": ["Individual", "Non-individual"],
    "label": "Is the trustee or senior partner an individual or non-individual?",
    "comment": "Not a field on the paper form"
  },
  
  "ReportingParty.TrusteeSeniorPartner.PersonNameDetails.Title.Text": {
    "type": "enum",
    "enumvalues": titles,
    "label": "Title",
    "comment": "Other allows arbitrary data entry - or long list of enums",
    "fieldnumber": "3"
  },
  "ReportingParty.TrusteeSeniorPartner.PersonNameDetails.FamilyName.Text": {
    "type": "text",
    "label": "Family name",
    "comment": "",
    "fieldnumber": "3"
  },
  "ReportingParty.TrusteeSeniorPartner.PersonNameDetails.GivenName.Text": {
    "type": "text",
    "label": "First given name",
    "comment": "",
    "fieldnumber": "3"
  },
  "ReportingParty.TrusteeSeniorPartner.PersonNameDetails.OtherGivenName.Text": {
    "type": "text",
    "label": "Other given name/s",
    "comment": "",
    "fieldnumber": "3"
  },
  "ReportingParty.TrusteeSeniorPartner.PersonNameDetails.NameSuffix.Text": {
    "type": "enum",
    "enumvalues": nameSuffixes,
    "label": "Suffix",
    "comment": "",
    "fieldnumber": "3"
  },

  "ReportingParty.TrusteeSeniorPartner.OrganisationNameDetails.OrganisationalName.Text": {
    "type": "text",
    "label": "Name of trustee or senior partner",
    "comment": "",
    "fieldnumber": "3"
  },

  "Myob.ReportingParty.Employer.IndividualOrNonIndividual": {
    "type": "enum",
    "enumvalues": ["Individual", "Non-individual"],
    "label": "Is the employer an individual or non-individual (company, partnership, trust etc)",
    "comment": "Not a field on the paper form"
  },
  "ReportingParty.Employer.PersonNameDetails.Title.Text": {
    "type": "enum",
    "enumvalues": titles,
    "label": "Title",
    "comment": "Other allows arbitrary data entry - or long list of enums",
    "fieldnumber": "4"
  },
  "ReportingParty.Employer.PersonNameDetails.FamilyName.Text": {
    "type": "text",
    "label": "Family name",
    "comment": "",
    "fieldnumber": "4"
  },
  "ReportingParty.Employer.PersonNameDetails.GivenName.Text": {
    "type": "text",
    "label": "First given name",
    "comment": "",
    "fieldnumber": "4"
  },
  "ReportingParty.Employer.PersonNameDetails.OtherGivenName.Text": {
    "type": "text",
    "label": "Other given name/s",
    "comment": "",
    "fieldnumber": "4"
  },
  "ReportingParty.Employer.PersonNameDetails.NameSuffix.Text": {
    "type": "enum",
    "enumvalues": nameSuffixes,
    "label": "Suffix",
    "comment": "",
    "fieldnumber": "4"
  },
  "ReportingParty.Employer.OrganisationNameDetails.OrganisationalName.Text": {
    "type": "text",
    "label": "Name of employer",
    "comment": "",
    "fieldnumber": "4"
  },

  "ReportingParty.Employer.Postal.AddressDetails.Line1.Text": {
    "type": "text",
    "label": "Address line 1",
    "comment": "What is max length, and what are the allowed characters",
    "fieldnumber": "5"
  },
  "ReportingParty.Employer.Postal.AddressDetails.Line2.Text": {
    "type": "text",
    "label": "Address line 2",
    "comment": "",
    "fieldnumber": "5"
  },
  "ReportingParty.Employer.Postal.AddressDetails.Line3.Text": {
    "type": "text",
    "label": "Address line 3",
    "comment": "",
    "fieldnumber": "5"
  },
  "ReportingParty.Employer.Postal.AddressDetails.Line4.Text": {
    "type": "text",
    "label": "Address line 4",
    "comment": "",
    "fieldnumber": "5"
  },
  "ReportingParty.Employer.Postal.AddressDetails.LocalityName.Text": {
    "type": "text",
    "label": "Suburb/town/locality",
    "comment": "",
    "fieldnumber": "5"
  },
  "ReportingParty.Employer.Postal.AddressDetails.StateOrTerritory.Code": {
    "type": "enum",
    "enumvalues": states,
    "label": "State",
    "comment": "",
    "fieldnumber": "5"
  },
  "ReportingParty.Employer.Postal.AddressDetails.Postcode.Text": {
    "type": "number",
    "label": "Postcode",
    "comment": "",
    "fieldnumber": "5"
  },
  "ReportingParty.Employer.Postal.AddressDetails.OverseasAddress.Indicator": {
    "type": "boolean",
    "label": "Postal address - Overseas Indicator",
    "hidden": true,
    "comment": "Should be hidden, but must be submitted if country is not Australia",
    "fieldnumber": "5"
  },
  "ReportingParty.Employer.Postal.AddressDetails.CountryName.Text": {
    "type": "text",
    "label": "Country if outside Australia",
    "comment": "Validation rules suggest it must always be blank??",
    "fieldnumber": "5"
  },

  "Myob.ReportingParty.Employer.Previous.Name.Required": {
    "type": "boolean",
    "label": "Has the employer name changed since the last FBT return?",
    "comment": "Not a field on the paper form"
  },
  "Myob.ReportingParty.Employer.Previous.IndividualOrNonIndividual": {
    "type": "enum",
    "enumvalues": ["Individual", "Non-individual"],
    "label": "Was the previous employer an individual or non-individual (company, partnership, trust etc)",
    "comment": "Not a field on the paper form"
  },
  "ReportingParty.Employer.Previous.PersonNameDetails.Title.Text": {
    "type": "enum",
    "enumvalues": titles,
    "label": "Title",
    "comment": "Other allows arbitrary data entry - or long list of enums",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.PersonNameDetails.FamilyName.Text": {
    "type": "text",
    "label": "Family name",
    "comment": "",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.PersonNameDetails.GivenName.Text": {
    "type": "text",
    "label": "First given name",
    "comment": "",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.PersonNameDetails.OtherGivenName.Text": {
    "type": "text",
    "label": "Other given name/s",
    "comment": "",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.PersonNameDetails.NameSuffix.Text": {
    "type": "enum",
    "enumvalues": nameSuffixes,
    "label": "Suffix",
    "comment": "",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.OrganisationNameDetails.OrganisationalName.Text": {
    "type": "text",
    "label": "Previous name",
    "comment": "",
    "fieldnumber": "6"
  },

  "Myob.ReportingParty.Employer.Previous.Required": {
    "type": "boolean",
    "label": "Has the employer postal address changed since the last FBT return?",
    "comment": "Not a field on the paper form"
  },
  "ReportingParty.Employer.Previous.AddressDetails.Line1.Text": {
    "type": "text",
    "label": "Address line 1",
    "comment": "What is max length, and what are the allowed characters",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.AddressDetails.Line2.Text": {
    "type": "text",
    "label": "Address line 2",
    "comment": "",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.AddressDetails.Line3.Text": {
    "type": "text",
    "label": "Address line 3",
    "comment": "",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.AddressDetails.Line4.Text": {
    "type": "text",
    "label": "Address line 4",
    "comment": "",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.AddressDetails.LocalityName.Text": {
    "type": "text",
    "label": "Suburb/town/locality",
    "comment": "",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.AddressDetails.StateOrTerritory.Code": {
    "type": "enum",
    "enumvalues": states,
    "label": "State",
    "comment": "",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.AddressDetails.Postcode.Text": {
    "type": "number",
    "label": "Postcode",
    "comment": "",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.AddressDetails.OverseasAddress.Indicator": {
    "type": "boolean",
    "label": "Previous postal address - Overseas Indicator",
    "hidden": true,
    "comment": "Should be hidden, but must be submitted if country is not Australia",
    "fieldnumber": "6"
  },
  "ReportingParty.Employer.Previous.AddressDetails.CountryName.Text": {
    "type": "text",
    "label": "Country if outside Australia",
    "comment": "Validation rules suggest it must always be blank??",
    "fieldnumber": "6"
  },

  "Myob.ReportingParty.BusinessTradingName.Required": {
    "type": "boolean",
    "label": "Has the business/trading name changed since the last FBT return, or is this the first FBT return?",
    "comment": "Not a field on the paper form"
  },
  "ReportingParty.BusinessTradingName.OrganisationNameDetails.OrganisationalName.Text": {
    "type": "text",
    "label": "Business/trading name",
    "comment": "",
    "fieldnumber": "7"
  },

  "Myob.ReportingParty.BusinessTradingAddress.Required": {
    "type": "boolean",
    "label": "Has the business/trading address changed since the last FBT return, or is this the first FBT return?",
    "comment": "Not a field on the paper form"
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.Line1.Text": {
    "type": "text",
    "label": "Address line 1",
    "comment": "What is max length, and what are the allowed characters",
    "fieldnumber": "7"
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.Line2.Text": {
    "type": "text",
    "label": "Address line 2",
    "comment": "",
    "fieldnumber": "7"
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.Line3.Text": {
    "type": "text",
    "label": "Address line 3",
    "comment": "",
    "fieldnumber": "7"
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.Line4.Text": {
    "type": "text",
    "label": "Address line 4",
    "comment": "",
    "fieldnumber": "7"
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.LocalityName.Text": {
    "type": "text",
    "label": "Suburb/town/locality",
    "comment": "",
    "fieldnumber": "7"
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.StateOrTerritory.Code": {
    "type": "enum",
    "enumvalues": states,
    "label": "State",
    "comment": "",
    "fieldnumber": "7"
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.Postcode.Text": {
    "type": "number",
    "label": "Postcode",
    "comment": "",
    "fieldnumber": "7"
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.OverseasAddress.Indicator": {
    "type": "boolean",
    "label": "Business/trading address - Overseas Indicator",
    "hidden": true,
    "comment": "Should be hidden, but must be submitted if country is not Australia",
    "fieldnumber": "7"
  },
  "ReportingParty.BusinessTradingAddress.AddressDetails.CountryName.Text": {
    "type": "text",
    "label": "Country if outside Australia",
    "comment": "Validation rules suggest it must always be blank??",
    "fieldnumber": "7"
  },

  "Myob.ReportingParty.TrusteeSeniorPartner.Previous.Required": {
    "type": "boolean",
    "label": "Has the name of the trustee or senior partner changed since the last FBT return?",
    "comment": "Not a field on the paper form"
  },
  "Myob.ReportingParty.TrusteeSeniorPartner.Previous.IndividualOrNonIndividual": {
    "type": "enum",
    "enumvalues": ["Individual", "Non-individual"],
    "label": "Was the previous trustee or senior partner an individual or non-individual (company, partnership, trust etc)",
    "comment": "Not a field on the paper form"
  },
  "ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.Title.Text": {
    "type": "enum",
    "enumvalues": titles,
    "label": "Title",
    "comment": "Other allows arbitrary data entry - or long list of enums",
    "fieldnumber": "8"
  },
  "ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.FamilyName.Text": {
    "type": "text",
    "label": "Family name",
    "comment": "",
    "fieldnumber": "8"
  },
  "ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.GivenName.Text": {
    "type": "text",
    "label": "First given name",
    "comment": "",
    "fieldnumber": "8"
  },
  "ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.OtherGivenName.Text": {
    "type": "text",
    "label": "Other given name/s",
    "comment": "",
    "fieldnumber": "8"
  },
  "ReportingParty.TrusteeSeniorPartner.Previous.PersonNameDetails.NameSuffix.Text": {
    "type": "enum",
    "enumvalues": nameSuffixes,
    "label": "Suffix",
    "comment": "",
    "fieldnumber": "6"
  },
  "ReportingParty.TrusteeSeniorPartner.Previous.OrganisationNameDetails.OrganisationalName.Text": {
    "type": "text",
    "label": "Previous name of trustee or senior partner",
    "comment": "",
    "fieldnumber": "8"
  },

  "ReportingParty.Contact.Title.Text": {
    "type": "enum",
    "enumvalues": titles,
    "label": "Title",
    "comment": "Other allows arbitrary data entry - or long list of enums",
    "fieldnumber": "9",
    "size": "25"
  },
  "ReportingParty.Contact.FamilyName.Text": {
    "type": "text",
    "label": "Family name",
    "comment": "",
    "fieldnumber": "9",
    "size": "50"
  },
  "ReportingParty.Contact.GivenName.Text": {
    "type": "text",
    "label": "First given name",
    "comment": "",
    "fieldnumber": "9",
    "size": "50"
  },
  "ReportingParty.Contact.OtherGivenName.Text": {
    "type": "text",
    "label": "Other given name/s",
    "comment": "",
    "fieldnumber": "9"
  },
  "ReportingParty.Contact.NameSuffix.Text": {
    "type": "enum",
    "enumvalues": nameSuffixes,
    "label": "Suffix",
    "comment": "",
    "fieldnumber": "9"
  },
  "ReportingParty.ElectronicContact.Telephone.Area.Code": {
    "type": "number",
    "label": "Name of the person to contact - Daytime contact phone number - Area code",
    "comment": "Must be two digits, or blank",
    "fieldnumber": "9"
  },
  "ReportingParty.ElectronicContact.Telephone.Minimal.Number": {
    "type": "number",
    "label": "Name of the person to contact - Daytime contact phone number - Phone number",
    "comment": "Max 15 characters. What is allowed? [0-9 +] ?",
    "fieldnumber": "9"
  },
  "ReportingParty.ElectronicContact.ElectronicMail.Address.Text": {
    "type": "text",
    "label": "Name of the person to contact - Email address",
    "comment": "Validation rules look strange. What does the SBR gateway do?",
    "fieldnumber": "9"
  },

  "ReportingParty.Remuneration.FringeBenefits.Recipients.Count": {
    "type": "number",
    "label": "Number of employees receiving fringe benefits during the period 1 April 2014 to 31 March 2015",
    "comment": "Missing from SBR Field Mappings FBT.csv as of 26/11/2014",
    "fieldnumber": "10"
  },

  "ReportingParty.Report.CompletionHours.Number": {
    "type": "number",
    "label": "Hours taken to prepare and complete this form",
    "optional": true,
    "comment": "Do we even want to show this field?",
    "fieldnumber": "11"
  },

  "ReportingParty.Lodgment.FinalReturn.Indicator": {
    "type": "boolean",
    "label": "Do you expect to lodge FBT return forms for future years?",
    "comment": "Default to no? Need to show warning if user selects yes.",
    "fieldnumber": "12"
  },

  "ReportingParty.FinancialInstitutionAccount.BankStateBranch.Number": {
    "type": "number",
    "label": "BSB",
    "comment": "Must be 6 digits",
    "fieldnumber": "13"
  },
  "ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccount.Number": {
    "type": "number",
    "label": "Account number",
    "comment": "Must be present if credit (refund) is due",
    "fieldnumber": "13"
  },
  "ReportingParty.FinancialInstitutionAccount.FinancialInstitutionAccountName.Text": {
    "type": "text",
    "label": "Account name",
    "comment": "Max 32 characters",
    "fieldnumber": "13"
  },

  "Myob.FringeBenefits.RebatableEmployer": {
    "type": "boolean",
    "label": "Are you a rebatable employer?",
    "comment": "Not a field on the paper form"
  },
  "Myob.FringeBenefits.PublicBenevolentInstitution": {
    "type": "boolean",
    "label": "Are you a hospital, ambulance, public benevolent institution, or health promotion charity?",
    "comment": "Not a field on the paper form"
  },

  "ReportingParty.Remuneration.FringeBenefits.Type1Aggregate.Amount": {
    "type": "amount_whole",
    "label": "Type 1 aggregate amount",
    "comment": "14A before applying factor (value on the left)",
    "fieldnumber": "14A"
  },
  "ReportingParty.FringeBenefitsTax.Type1Aggregate.Amount": {
    "type": "amount_whole",
    "label": "Type 1 taxable amount",
    "source": "calculation",
    "fieldnumber": "14A"
  },
  "ReportingParty.Remuneration.FringeBenefits.Type2Aggregate.Amount": {
    "type": "amount_whole",
    "label": "Type 2 aggregate amount",
    "comment": "14B before applying factor (value on the left)",
    "fieldnumber": "14B"
  },
  "ReportingParty.FringeBenefitsTax.Type2Aggregate.Amount": {
    "type": "amount_whole",
    "label": "Type 2 taxable amount",
    "source": "calculation",
    "fieldnumber": "14B"
  },
  "ReportingParty.Remuneration.FringeBenefits.AggregateNonExempt.Amount": {
    "type": "amount_whole",
    "label": "Aggregate non-exempt amount",
    "fieldnumber": "14C"
  },
  "ReportingParty.Remuneration.FringeBenefits.TaxableTotal.Amount": {
    "type": "amount_whole",
    "label": "Fringe benefits taxable amount",
    "source": "calculation",
    "fieldnumber": "15"
  },
  "ReportingParty.FringeBenefitsTax.Payable.Amount": {
    "type": "amount_cents",
    "label": "Amount of tax payable",
    "source": "calculation",
    "fieldnumber": "16"
  },
  "ReportingParty.FringeBenefitsTax.NonRebatableAggregate.Amount": {
    "type": "amount_cents",
    "label": "Aggregate non-rebatable amount",
    "fieldnumber": "17"
  },
  "ReportingParty.FringeBenefitsTax.Rebate.Amount": {
    "type": "amount_cents",
    "label": "Amount of rebate",
    "source": "calculation",
    "fieldnumber": "18"
  },
  "ReportingParty.FringeBenefitsTax.Liability.Amount": {
    "type": "amount_cents",
    "label": "Sub-total",
    "source": "calculation",
    "fieldnumber": "19"
  },
  "ReportingParty.FringeBenefitsTax.LiabilityInstalmentsTotal.Amount": {
    "type": "amount_whole",
    "label": "Less instalment amounts reported on activity statements",
    "fieldnumber": "20"
  },
  "ReportingParty.FringeBenefitsTax.AdjustmentDue.Amount": {
    "type": "amount_cents",
    "label": "Payment due (if positive) or Credit due to you (if negative)",
    "source": "calculation",
    "fieldnumber": "21",
    "comment": "Both 21 and 22. If the number is positive, it goes in 21 (payment due). If it is negative, it goes in 22 (credit due)."
  },

  "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.ItemsProvided.Number": {
    "type": "number",
    "label": "Cars using the statutory formula: Number",
    "comment": "23A, left-most column",
    "fieldnumber": "23A"
  },
  "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Cars using the statutory formula: Gross taxable value",
    "fieldnumber": "23Aa"
  },
  "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.EmployeeContribution.Amount": {
    "type": "amount_whole",
    "label": "Cars using the statutory formula: Employee contribution",
    "fieldnumber": "23Ab"
  },
  "ReportingParty.CarsStatutoryFormula.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Cars using the statutory formula: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23A"
  },

  "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.ItemsProvided.Number": {
    "type": "number",
    "label": "Cars using the operating cost method: Number",
    "comment": "23B, left-most column",
    "fieldnumber": "23B"
  },
  "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Cars using the operating cost method: Gross taxable value",
    "fieldnumber": "23Ba"
  },
  "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.EmployeeContribution.Amount": {
    "type": "amount_whole",
    "label": "Cars using the operating cost method: Employee contribution",
    "fieldnumber": "23Bb"
  },
  "ReportingParty.CarsOperatingCost.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Cars using the operating cost method: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23B"
  },

  "ReportingParty.LoansGranted.Remuneration.FringeBenefits.ItemsProvided.Number": {
    "type": "number",
    "label": "Loans granted: Number",
    "comment": "23C, left-most column",
    "fieldnumber": "23C"
  },
  "ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Loans granted: Gross taxable value",
    "fieldnumber": "23Ca"
  },
  "ReportingParty.LoansGranted.Remuneration.FringeBenefits.Reduction.Amount": {
    "type": "amount_whole",
    "label": "Loans granted: Value of reductions",
    "fieldnumber": "23Cc"
  },
  "ReportingParty.LoansGranted.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Loans granted: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23C"
  },

  "ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Debt waiver: Gross taxable value",
    "fieldnumber": "23Da"
  },
  "ReportingParty.DebtWaiver.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Debt waiver: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23D"
  },

  "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Expense payments: Gross taxable value",
    "fieldnumber": "23Ea"
  },
  "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.EmployeeContribution.Amount": {
    "type": "amount_whole",
    "label": "Expense payments: Employee contribution",
    "fieldnumber": "23Eb"
  },
  "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.Reduction.Amount": {
    "type": "amount_whole",
    "label": "Expense payments: Value of reductions",
    "fieldnumber": "23Ec"
  },
  "ReportingParty.ExpensePayment.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Expense payments: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23E"
  },

  "ReportingParty.Housing.Remuneration.FringeBenefits.ItemsProvided.Number": {
    "type": "number",
    "label": "Housing: Number",
    "comment": "23F, left-most column",
    "fieldnumber": "23F"
  },
  "ReportingParty.Housing.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Housing: Gross taxable value",
    "fieldnumber": "23Fa"
  },
  "ReportingParty.Housing.Remuneration.FringeBenefits.EmployeeContribution.Amount": {
    "type": "amount_whole",
    "label": "Housing: Employee contribution",
    "fieldnumber": "23Fb"
  },
  "ReportingParty.Housing.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Housing: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23F"
  },

  "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.ItemsProvided.Number": {
    "type": "number",
    "label": "Employees receiving living-away-from-home allowance: Number",
    "comment": "23G, left-most column",
    "fieldnumber": "23G"
  },
  "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Employees receiving living-away-from-home allowance: Gross taxable value",
    "fieldnumber": "23Ga"
  },
  "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.Reduction.Amount": {
    "type": "amount_whole",
    "label": "Employees receiving living-away-from-home allowance: Value of reductions",
    "fieldnumber": "23Gc"
  },
  "ReportingParty.EmployeeReceiving.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Employees receiving living-away-from-home allowance: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23G"
  },

  "ReportingParty.Board.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Board: Gross taxable value",
    "fieldnumber": "23Ja"
  },
  "ReportingParty.Board.Remuneration.FringeBenefits.EmployeeContribution.Amount": {
    "type": "amount_whole",
    "label": "Board: Employee contribution",
    "fieldnumber": "23Jb"
  },
  "ReportingParty.Board.Remuneration.FringeBenefits.Reduction.Amount": {
    "type": "amount_whole",
    "label": "Board: Value of reductions",
    "fieldnumber": "23Jc"
  },
  "ReportingParty.Board.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Board: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23J"
  },

  "ReportingParty.Property.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Property: Gross taxable value",
    "fieldnumber": "23Ka"
  },
  "ReportingParty.Property.Remuneration.FringeBenefits.EmployeeContribution.Amount": {
    "type": "amount_whole",
    "label": "Property: Employee contribution",
    "fieldnumber": "23Kb"
  },
  "ReportingParty.Property.Remuneration.FringeBenefits.Reduction.Amount": {
    "type": "amount_whole",
    "label": "Property: Value of reductions",
    "fieldnumber": "23Kc"
  },
  "ReportingParty.Property.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Property: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23K"
  },

  "ReportingParty.IncomeTaxExempt.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Income tax exempt body - entertainment: Gross taxable value",
    "fieldnumber": "23La"
  },
  "ReportingParty.IncomeTaxExempt.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Income tax exempt body - entertainment: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23L"
  },

  "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Other benefits (residual): Gross taxable value",
    "fieldnumber": "23Ma"
  },
  "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.EmployeeContribution.Amount": {
    "type": "amount_whole",
    "label": "Other benefits (residual): Employee contribution",
    "fieldnumber": "23Mb"
  },
  "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.Reduction.Amount": {
    "type": "amount_whole",
    "label": "Other benefits (residual): Value of reductions",
    "fieldnumber": "23Mc"
  },
  "ReportingParty.OtherBenefits.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Other benefits (residual): Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23M"
  },

  "ReportingParty.CarParking.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Car parking: Gross taxable value",
    "fieldnumber": "23Na"
  },
  "ReportingParty.CarParking.Remuneration.FringeBenefits.EmployeeContribution.Amount": {
    "type": "amount_whole",
    "label": "Car parking: Employee contribution",
    "fieldnumber": "23Nb"
  },
  "ReportingParty.CarParking.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Car parking: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23N"
  },

  "ReportingParty.MealEntertainment.Remuneration.FringeBenefits.BenefitGrossTaxable.Amount": {
    "type": "amount_whole",
    "label": "Meal entertainment: Gross taxable value",
    "fieldnumber": "23Pa"
  },
  "ReportingParty.MealEntertainment.Remuneration.FringeBenefits.BenefitNetTaxable.Amount": {
    "type": "amount_whole",
    "label": "Meal entertainment: Taxable value of benefits",
    "source": "calculation",
    "fieldnumber": "23P"
  },

  "Intermediary.Abn": {
    "type": "number",
    "label": "Tax agent ABN",
    "comment": "Must be 11 digits, validation algorithm exists. Will be pulled from on premise tax database eventually, but manually entered for now."
  },

  "Intermediary.PersonUnstructuredName.FullName.Text": {
    "type": "text",
    "label": "Tax agent's declaration - Name of tax agent",
    "comment": "",
    "fieldnumber": "24"
  },
  "Intermediary.Identifiers.TaxAgentNumber.Identifier": {
    "type": "number",
    "label": "Tax agent's declaration - Tax agent registration number",
    "comment": "Numbers only, or text?",
    "fieldnumber": "24"
  },
  "Intermediary.Declaration.SignatoryIdentifier.Text": {
    "type": "text",
    "label": "Tax agent's declaration - Signature of tax agent",
    "comment": "",
    "fieldnumber": "24"
  },
  "Intermediary.ElectronicContact.Telephone.Area.Code": {
    "type": "number",
    "label": "Tax agent's declaration - Tax agent phone number - Area code",
    "hidden": true,
    "comment": "It is not visible on the paper form for 2014. Hidden until resolved. Must be two digits, or blank.",
    "fieldnumber": "24"
  },
  "Intermediary.ElectronicContact.Telephone.Minimal.Number": {
    "type": "number",
    "label": "Tax agent's declaration - Tax agent phone number - Phone number",
    "hidden": true,
    "comment": "It is not visible on the paper form for 2014. Hidden until resolved. Max 15 characters. What is allowed? [0-9 +] ?",
    "fieldnumber": "24"
  },
  "Intermediary.Identifiers.TaxAgentClientReference.Text": {
    "type": "number",
    "label": "Tax agent's declaration - Tax agent client reference",
    "hidden": true,
    "comment": "What is this? It is not visible on the paper form for 2014. Hidden until resolved.",
    "fieldnumber": "24"
  },

  "ReportingParty.Declaration.SignatoryIdentifier.Text": {
    "type": "text",
    "label": "Employer's declaration - Signature of employer",
    "comment": "Only used when employer lodges the return. Does this mean we should not show it? Also, 'Name of employer' is a field on the 2014 paper form, but there is no ELS tag, and I can't find an SBR ID for it.",
    "fieldnumber": "25"
  }
};
