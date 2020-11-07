import * as Primitive from './xml-primitives';

// Source files:
// http://localhost:8080/property
// https://www.retall.org/wp-content/uploads/2019/04/Core-Data-4.0.xml


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
export type AddressInfo = ("property" | "mailing" | "shipping" | "billing" | "current" | "previous" | "forwarding" | "legal_notice" | "termination_notice" | "other");
interface _AddressInfo extends Primitive._string { content: AddressInfo; }

/** This element describes a (real-world or e-mail) address
  *
  * Description (optional)
  * String description for Other Address Type
  * AddressLine1 (optional)
  * PO Box or Street number, direction, street name, suffix
  * AddressLine2 (optional)
  * Additional address line
  * City  (optional)
  * City property is located in
  * State  (optional)
  * The State attribute describes the 2-3 character state code of the
  * address, not the full state name.
  * Province  (optional)
  * Province if not US property
  * Postal Code   (optional)
  * Property postal code
  * Country   (optional)
  * Country property is located in
  * CountryName    (optional)
  * County common name
  * UnparsedAddress    (optional) */
interface _AddressType extends BaseType {
	AddressType: AddressInfo;
	AddressLine1?: string;
	AddressLine2?: string;
	City?: string;
	Country?: string;
	CountyName?: string;
	Description?: string;
	PostalCode?: string;
	Province?: string;
	State?: string;
	UnparsedAddress?: string;
}
export interface AddressType extends _AddressType { constructor: { new(): AddressType }; }
export var AddressType: { new(): AddressType };

/** This is a simple container for CompanyType */
interface _CompaniesType extends BaseType {
	Company: CompanyType[];
}
export interface CompaniesType extends _CompaniesType { constructor: { new(): CompaniesType }; }
export var CompaniesType: { new(): CompaniesType };

/** This is a simple container for CompanyContact */
interface _CompanyContactsType extends BaseType {
	CompanyContact: CompanyPersonContactType[];
}
export interface CompanyContactsType extends _CompanyContactsType { constructor: { new(): CompanyContactsType }; }
export var CompanyContactsType: { new(): CompanyContactsType };

/** This element describes information about a Company Contact
  *
  * CompanyRef (optional)
  * Company reference indentification
  * CompanyRole (optional)
  * Company Role
  * CompanyContacts (optional)
  * Company Contact person info */
interface _CompanyContactType extends BaseType {
	CompanyContacts?: CompanyContactsType;
	CompanyRef?: Identifiable;
	CompanyRole?: CompanyRoleType;
}
export interface CompanyContactType extends _CompanyContactType { constructor: { new(): CompanyContactType }; }
export var CompanyContactType: { new(): CompanyContactType };

/** This element describes information about Company Contact Person
  *
  * PersonContactRef (required)
  * Contact Person identification info
  * PersonContactRole (required)
  * Contact Person Role */
interface _CompanyPersonContactType extends BaseType {
	PersonContactRef: Identifiable;
	PersonContactRole: PersonCompanyRoleType;
}
export interface CompanyPersonContactType extends _CompanyPersonContactType { constructor: { new(): CompanyPersonContactType }; }
export var CompanyPersonContactType: { new(): CompanyPersonContactType };

export type CompanyRoleType = ("management_company" | "owner" | "vendor" | "asset_managment" | "lending firm" | "investment_company" | "employer" | "previous_employer" | "bank" | "other");
interface _CompanyRoleType extends Primitive._string { content: CompanyRoleType; }

/** This element describes information about a Company
  *
  * Company Name (required)
  * Name of Company
  * Address (optional)
  * Address of Company
  * Website (optional)
  * Company Website URL
  * Logo (optional)
  * Company Logo string
  * Phone (optional)
  * Company Phone number
  * Email    (optional)
  * Email address  (optional) */
interface _CompanyType extends _Identifiable {
	Address?: AddressType[];
	CompanyName: string;
	Email?: string;
	Logo?: string;
	Phone?: PhoneType[];
	WebSite?: string;
}
export interface CompanyType extends _CompanyType { constructor: { new(): CompanyType }; }
export var CompanyType: { new(): CompanyType };

interface _ConcessionType extends BaseType {
	Active: boolean;
	DateRange: ConcessionTypeDateRangeType;
	DescriptionBody?: string;
	DescriptionFooter?: string;
	DescriptionHeader?: string;
	Term?: number;
	Value?: number;
}
export interface ConcessionType extends _ConcessionType { constructor: { new(): ConcessionType }; }
export var ConcessionType: { new(): ConcessionType };

interface _ConcessionTypeDateRangeType extends BaseType {}
interface ConcessionTypeDateRangeType extends _ConcessionTypeDateRangeType { constructor: { new(): ConcessionTypeDateRangeType }; }

type ConcessionTypeDescriptionBodyType = string;
type _ConcessionTypeDescriptionBodyType = Primitive._string;

type ConcessionTypeDescriptionFooterType = string;
type _ConcessionTypeDescriptionFooterType = Primitive._string;

type ConcessionTypeDescriptionHeaderType = string;
type _ConcessionTypeDescriptionHeaderType = Primitive._string;

/** This is a container for Property, Company and Person Contacts
  *
  * PropertyContacts
  * Property Contact info
  * Companies
  * Company Contact info
  * Persons
  * Person Contact info */
interface _ContactsType extends BaseType {
	Companies: CompaniesType;
	Persons: PersonsType;
	PropertyContacts: PropertyContactsType;
}
export interface ContactsType extends _ContactsType { constructor: { new(): ContactsType }; }
export var ContactsType: { new(): ContactsType };

/** A type of currency, specified by an ISO-4217 3-letter currency code.  Since enumerating a list of every possible currency type would be problematic, this type doesn't actually require a valid ISO code.  Instead, it validates only that its contents are 3 characters; the burden of validating the actual code is left to implementers.  Examples of common ISO currency codes are included below for reference purposes; the full list can be found at: http://en.wikipedia.org/wiki/ISO_4217.
  *
  * AUD
  * Australian Dollar
  * BRL
  * Brazilian Real
  * CAD
  * Canadian Dollar
  * CNY
  * Chinese Renminbi
  * EUR
  * Euro
  * GBP
  * British Pound Sterling
  * INR
  * Indian Rupee
  * JPY
  * Japanese Yen
  * RUR
  * Russian Rouble
  * USD
  * United States Dollars
  *
  * NOTE: This type should only ever be used by optional attributes/elements.  If it is not specified, it should be assumed to "default" to USD (United States Dollars). */
export type Currency = string;
type _Currency = Primitive._string;

/** A Range Of Currencies - pattern based
  *
  * The Min and Max attributes specify the minimum and maximum acceptable
  * amounts.  Alternatively, the Exact attribute can be used to specify an
  * exact amount. */
interface _CurrencyRangeType extends BaseType {
	Currency?: string;
	Exact?: string;
	Max?: string;
	Min?: string;
}
export interface CurrencyRangeType extends _CurrencyRangeType { constructor: { new(): CurrencyRangeType }; }
export var CurrencyRangeType: { new(): CurrencyRangeType };

/** Total number of Occupants, with number of children optional */
interface _CurrentNumberOccupantsType extends BaseType {
	Child?: number;
	Total: number;
}
export interface CurrentNumberOccupantsType extends _CurrentNumberOccupantsType { constructor: { new(): CurrentNumberOccupantsType }; }
export var CurrentNumberOccupantsType: { new(): CurrentNumberOccupantsType };

export type CustomerInfo = ("guest" | "applicant" | "customer" | "current_resident" | "former_resident" | "future_resident" | "prospect" | "other");
interface _CustomerInfo extends Primitive._string { content: CustomerInfo; }

/** Decimal (4 Digits, 2 Fraction Digits) */
export type Decimal4Digits2Fraction = number;
type _Decimal4Digits2Fraction = Primitive._number;

/** Decimal (7 Digits, 2 Fraction Digits) */
export type Decimal7Digits2Fraction = number;
type _Decimal7Digits2Fraction = Primitive._number;

interface _DepositType extends BaseType {
	DepositType: string;
	Amount?: DepositTypeAmountType;
	Description?: string;
	PercentRefundable?: number;
	PortionRefundable?: number;
}
export interface DepositType extends _DepositType { constructor: { new(): DepositType }; }
export var DepositType: { new(): DepositType };

interface _DepositTypeAmountType extends BaseType {
	AmountType: DepositTypeAmountTypeAmountTypeType;
	ValueRange: CurrencyRangeType;
}
interface DepositTypeAmountType extends _DepositTypeAmountType { constructor: { new(): DepositTypeAmountType }; }

type DepositTypeAmountTypeAmountTypeType = ("MonthMultiple" | "Minimum" | "Maximum" | "Actual");
interface _DepositTypeAmountTypeAmountTypeType extends Primitive._string { content: DepositTypeAmountTypeAmountTypeType; }

type DepositTypeDepositTypeType = string;
type _DepositTypeDepositTypeType = Primitive._string;

type DepositTypeDescriptionType = string;
type _DepositTypeDescriptionType = Primitive._string;

interface _FeeType extends BaseType {
	LateFeePerDay: number;
	LateMinFee: number;
	LatePercent: number;
	LateType: string;
	NonRefundableHoldFee: number;
	ProrateType: FeeTypeProrateTypeType;
}
export interface FeeType extends _FeeType { constructor: { new(): FeeType }; }
export var FeeType: { new(): FeeType };

type FeeTypeLateTypeType = string;
type _FeeTypeLateTypeType = Primitive._string;

type FeeTypeProrateTypeType = ("Standard" | "Annualized" | "DaysInMonth");
interface _FeeTypeProrateTypeType extends Primitive._string { content: FeeTypeProrateTypeType; }

/** Use for attaching files to Property,Building,Floorplan,Unit, and Phase */
interface _FileType extends BaseType {
	Active: boolean;
	FileID: string;
	/** Text description specified for subject */
	Caption?: string;
	Description?: string;
	/** Example: photo, floorplan, logo, etc. */
	FileType: FileTypeFileTypeType;
	Format: string;
	Height?: number;
	Name: string;
	/** Relative ranking of subject file among files of similar type */
	Rank: string;
	Src: string;
	Width?: number;
}
export interface FileType extends _FileType { constructor: { new(): FileType }; }
export var FileType: { new(): FileType };

type FileTypeCaptionType = string;
type _FileTypeCaptionType = Primitive._string;

type FileTypeFileIDType = string;
type _FileTypeFileIDType = Primitive._string;

type FileTypeFileTypeType = ("Photo" | "Floorplan" | "Logo" | "Video" | "Blueprint" | "Other");
interface _FileTypeFileTypeType extends Primitive._string { content: FileTypeFileTypeType; }

type FileTypeFormatType = string;
type _FileTypeFormatType = Primitive._string;

type FileTypeNameType = string;
type _FileTypeNameType = Primitive._string;

type FileTypeRankType = string;
type _FileTypeRankType = Primitive._string;

type FileTypeSrcType = string;
type _FileTypeSrcType = Primitive._string;

/** Amenities that belongs to phase or community level 11/28/06 */
interface _GeneralAmenityType extends BaseType {
	AmenitySubType?: GeneralAmenityTypeAmenitySubTypeType;
	AmenityType: GeneralAmenityTypeAmenityTypeType;
	Description?: string;
	Rank?: number;
}
export interface GeneralAmenityType extends _GeneralAmenityType { constructor: { new(): GeneralAmenityType }; }
export var GeneralAmenityType: { new(): GeneralAmenityType };

type GeneralAmenityTypeAmenitySubTypeType = ("Attached" | "Detached" | "Both" | "SameLevelParking");
interface _GeneralAmenityTypeAmenitySubTypeType extends Primitive._string { content: GeneralAmenityTypeAmenitySubTypeType; }

type GeneralAmenityTypeAmenityTypeType = ("Other" | "Availability24Hours" | "AccentWalls" | "BasketballCourt" | "Bilingual" | "BoatDocks" | "BusinessCenter" | "CarWashArea" | "ChildCare" | "ClubDiscount" | "ClubHouse" | "ConferenceRoom" | "Concierge" | "CoverPark" | "DoorAttendant" | "FitnessCenter" | "Elevator" | "FreeWeights" | "FurnishedAvailable" | "GamingStations" | "Garage" | "Gate" | "GroceryService" | "GroupExcercise" | "GuestRoom" | "HighSpeed" | "Housekeeping" | "HouseSitting" | "JoggingWalkingTrails" | "LakeFront" | "LakeAccess" | "Laundry" | "Library" | "MealService" | "MediaRoom" | "MultiUseRoom" | "NightPatrol" | "OnSiteMaintenance" | "OnSiteManagement" | "PackageReceiving" | "PerDiemAccepted" | "Pool" | "PlayGround" | "Racquetball" | "RecRoom" | "Recycling" | "Sauna" | "ShortTermLease" | "SmokeFree" | "Spa" | "StorageSpace" | "Sundeck" | "TennisCourt" | "Transportation" | "TVLounge" | "ValetTrash" | "Vintage" | "VolleyballCourt" | "WirelessInternet");
interface _GeneralAmenityTypeAmenityTypeType extends Primitive._string { content: GeneralAmenityTypeAmenityTypeType; }

type GeneralAmenityTypeDescriptionType = string;
type _GeneralAmenityTypeDescriptionType = Primitive._string;

/** Elements that extend this type (formerly "IdentificationType") can
  * describe their contents both in standard XML terms, and (optionally) in
  * terms of a reference to a database record or other identification
  * string. */
interface _Identifiable extends BaseType {
	Identification?: Identification[];
}
export interface Identifiable extends _Identifiable { constructor: { new(): Identifiable }; }
export var Identifiable: { new(): Identifiable };

/** This tag may be used to describe database primary key, or other
  * identification string, which relates to the parent element.
  * Alternatively, it may also be used to reference another element (that
  * contains a non-reference Identification) in the instance document.
  *
  * IDValue (required)
  * defines the actual identifications string
  * OrganizationName
  * Defines the organization that this
  * Identification pertains to
  * IDType
  * Specifies the type of ID, within the specified
  * organization, that is being represented.  For instance, if the ID in
  * question references a record in the property table of Example.com's
  * database, it would be appropriate to specify a type of "property" for
  * that Identification
  * IDRank
  * Specifies the rank of the Identification (relative
  * to other Identifications for the same entity)
  * IDScopeType
  * Specifies whether this Identification pertains
  * to the sender of this document, the receiver of it, or a third party
  *
  * The following example describes a reference to a record #555 in the
  * Lease table of Example.com's database:
  *
  * <Identification OrganizationName="Example.com" IDType="Lease"
  * IDValue="55"/> */
interface _Identification extends BaseType {
	IDRank: IDRank;
	IDScopeType: IDScopeType;
	IDType: string;
	IDValue: string;
	OrganizationName: string;
}
export interface Identification extends _Identification { constructor: { new(): Identification }; }
export var Identification: { new(): Identification };

export type IDRank = ("primary" | "secondary" | "tertiary" | "other");
interface _IDRank extends Primitive._string { content: IDRank; }

export type IDScopeType = ("sender" | "recipient" | "thirdparty");
interface _IDScopeType extends Primitive._string { content: IDScopeType; }

/** Integer (5 Digits) */
export type Integer5Digit = number;
type _Integer5Digit = Primitive._number;

interface _LeadChannelType extends _Identification {
	Source: string;
	/** LeadNotification contains the exact contact data for the specified notification type.  For example, if the notification type is ‘Email’, the  LeadNotification							 content would be the email address itself. */
	LeadNotification: LeadChannelTypeLeadNotificationType[];
}
export interface LeadChannelType extends _LeadChannelType { constructor: { new(): LeadChannelType }; }
export var LeadChannelType: { new(): LeadChannelType };

interface _LeadChannelTypeLeadNotificationType extends Primitive._string {
	NotificationType: NotificationType;
}
interface LeadChannelTypeLeadNotificationType extends _LeadChannelTypeLeadNotificationType { constructor: { new(): LeadChannelTypeLeadNotificationType }; }

/** Elements describing Lease information
  *
  * CurrentRent
  * Current Rent amount
  * ExpectedMoveInDate
  * Expected Move In date
  * ExpectedMoveOutDate
  * Expected Move Out date
  * ActualMoveIn
  * Actual Move In date
  * ActualMoveOut
  * Actual Move Out date
  * ResponsibleForLease
  * Respnsible for Lease? (Y/N)
  * LeaseSignDate
  * Date Lease signed
  * SpecialStatus
  * Special status
  * PaymentAccepted
  * Payment accepted
  * AccountNumber
  * Account Number
  * CurrentNumberOccupants
  * Total number of Occupants, with number of children optional */
interface _LeaseType extends _Identifiable {
	AccountNumber?: string;
	ActualMoveIn?: Date;
	ActualMoveOut?: Date;
	CurrentNumberOccupants?: CurrentNumberOccupantsType;
	CurrentRent?: number;
	ExpectedMoveInDate?: Date;
	ExpectedMoveOutDate?: Date;
	LeaseFromDate?: Date;
	LeaseSignDate?: Date;
	LeaseToDate?: Date;
	PaymentAccepted?: string;
	ResponsibleForLease?: boolean;
	SpecialStatus?: string;
}
export interface LeaseType extends _LeaseType { constructor: { new(): LeaseType }; }
export var LeaseType: { new(): LeaseType };

/** An amount of money, which may be negative and may have up to two decimal places, of some currency.   The currency is assumed to be US dollars unless an accompanying Currency attribute specifies otherwise.  Valid examples include:
  *
  * 12.34
  * -12.34
  * 12 */
export type Money = string;
type _Money = Primitive._string;

/** Elements describing Name information
  *
  * NamePrefix (optional)
  * Name prefix
  * FirstName
  * First name
  * MiddleName (optional)
  * Middle name
  * LastName
  * Last name
  * MaidenName (optional)
  * Spouse Maiden name
  * NameSuffix (optional)
  * Name suffix */
interface _NameType extends BaseType {
	FirstName: string;
	LastName: string;
	MaidenName?: string;
	MiddleName?: string;
	NamePrefix?: string;
	NameSuffix?: string;
}
export interface NameType extends _NameType { constructor: { new(): NameType }; }
export var NameType: { new(): NameType };


export type NotificationType = ("Email" | "Phone" | "FTP" | "Webservice" | "Chat" | "Text" | "Other");
interface _NotificationType extends Primitive._string { content: NotificationType; }

/** A Range of Integers */
interface _NumericRangeType extends BaseType {
	Exact?: number;
	Max?: number;
	Min?: number;
}
export interface NumericRangeType extends _NumericRangeType { constructor: { new(): NumericRangeType }; }
export var NumericRangeType: { new(): NumericRangeType };

interface _OfferTermType extends BaseType {
	DateRange: OfferTermTypeDateRangeType;
	EffectiveRent: string;
	Term: number;
}
export interface OfferTermType extends _OfferTermType { constructor: { new(): OfferTermType }; }
export var OfferTermType: { new(): OfferTermType };

interface _OfferTermTypeDateRangeType extends BaseType {}
interface OfferTermTypeDateRangeType extends _OfferTermTypeDateRangeType { constructor: { new(): OfferTermTypeDateRangeType }; }

export type PersonCompanyRoleType = ("manager" | "owner" | "vendor" | "accountant" | "tax_accountant" | "lawyer" | "asset_manager" | "lender" | "investor" | "other");
interface _PersonCompanyRoleType extends Primitive._string { content: PersonCompanyRoleType; }

/** This is a container for PersonType */
interface _PersonsType extends BaseType {
	Person: PersonType[];
}
export interface PersonsType extends _PersonsType { constructor: { new(): PersonsType }; }
export var PersonsType: { new(): PersonsType };

/** Name, Address, Phone and Email information for a Person */
interface _PersonType extends _Identifiable {
	Address?: AddressType[];
	Email?: string;
	Name: NameType;
	Phone?: PhoneType[];
}
export interface PersonType extends _PersonType { constructor: { new(): PersonType }; }
export var PersonType: { new(): PersonType };

/** Pet */
interface _PetType extends BaseType {
	Count: number;
	Description?: string;
	PetType: PetTypePetTypeType;
	Size?: PetTypeSizeType;
	Weight?: string;
}
export interface PetType extends _PetType { constructor: { new(): PetType }; }
export var PetType: { new(): PetType };

type PetTypeCountType = number;
type _PetTypeCountType = Primitive._number;

type PetTypeDescriptionType = string;
type _PetTypeDescriptionType = Primitive._string;

type PetTypePetTypeType = ("Dog" | "Cat" | "Bird" | "Reptile" | "Fish" | "Other");
interface _PetTypePetTypeType extends Primitive._string { content: PetTypePetTypeType; }

type PetTypeSizeType = ("Huge" | "Large" | "Medium" | "Small" | "Tiny");
interface _PetTypeSizeType extends Primitive._string { content: PetTypeSizeType; }

export type PhoneInfo = ("office" | "cell" | "fax" | "personal" | "home" | "other");
interface _PhoneInfo extends Primitive._string { content: PhoneInfo; }

/** Description, Number and Extension information for a Phone contact */
interface _PhoneType extends BaseType {
	PhoneType: PhoneInfo;
	Extension?: string;
	PhoneDescription?: string;
	PhoneNumber?: string;
}
export interface PhoneType extends _PhoneType { constructor: { new(): PhoneType }; }
export var PhoneType: { new(): PhoneType };

interface _PhysicalPropertyType extends BaseType {
	/** Management Info */
	Management?: PhysicalPropertyTypeManagementType[];
	Property: PhysicalPropertyTypePropertyType[];
	PropertyDataUploadResponse?: PropertyDataUploadResponseType;
}
interface PhysicalPropertyType extends _PhysicalPropertyType { constructor: { new(): PhysicalPropertyType }; }

interface _PhysicalPropertyTypeManagementType extends _Identification {
	/** FileID, Active */
	File?: FileType[];
	/** Node contians CompanyType and PersonType */
	PropertyContacts?: PhysicalPropertyTypeManagementTypePropertyContactsType;
}
interface PhysicalPropertyTypeManagementType extends _PhysicalPropertyTypeManagementType { constructor: { new(): PhysicalPropertyTypeManagementType }; }

interface _PhysicalPropertyTypeManagementTypePropertyContactsType extends BaseType {
	Companies?: CompanyType[];
	Persons?: PersonType[];
}
interface PhysicalPropertyTypeManagementTypePropertyContactsType extends _PhysicalPropertyTypeManagementTypePropertyContactsType { constructor: { new(): PhysicalPropertyTypeManagementTypePropertyContactsType }; }

interface _PhysicalPropertyTypePropertyType extends _Identification {
	Accounting?: PhysicalPropertyTypePropertyTypeAccountingType;
	Amenity?: GeneralAmenityType[];
	Building?: PhysicalPropertyTypePropertyTypeBuildingType[];
	/** Active */
	Concession?: PhysicalPropertyTypePropertyTypeConcessionType[];
	/** Type */
	Deposit?: DepositType;
	Fee?: PhysicalPropertyTypePropertyTypeFeeType;
	/** Id, Active */
	File?: FileType[];
	Floorplan: PhysicalPropertyTypePropertyTypeFloorplanType[];
	General_ID?: Identification[];
	ILS?: PhysicalPropertyTypePropertyTypeILSType;
	/** ILS_IdentificationType, RentalType */
	ILS_Identification: PhysicalPropertyTypePropertyTypeILS_IdentificationType;
	ILS_Unit?: PhysicalPropertyTypePropertyTypeILS_UnitType[];
	Information: PhysicalPropertyTypePropertyTypeInformationType;
	LeadChannelList?: PhysicalPropertyTypePropertyTypeLeadChannelListType;
	Payment?: PhysicalPropertyTypePropertyTypePaymentType;
	Phase?: PhysicalPropertyTypePropertyTypePhaseType[];
	Policy?: PhysicalPropertyTypePropertyTypePolicyType;
	/** Promotional Bullet Points for ILS Listings */
	Promotional?: string[];
	/** MITS 4.0 PropertyType */
	PropertyID: PhysicalPropertyTypePropertyTypePropertyIDType;
	SeniorServices?: SeniorLivingAmenityType[];
	/** MajorUtility */
	Utility?: PhysicalPropertyTypePropertyTypeUtilityType;
}
interface PhysicalPropertyTypePropertyType extends _PhysicalPropertyTypePropertyType { constructor: { new(): PhysicalPropertyTypePropertyType }; }

interface _PhysicalPropertyTypePropertyTypeAccountingType extends BaseType {
	AccountsPayable: PhysicalPropertyTypePropertyTypeAccountingTypeAccountsPayableType;
	AccountsReceivable: PhysicalPropertyTypePropertyTypeAccountingTypeAccountsReceivableType;
	AcctMthEndFlag: PhysicalPropertyTypePropertyTypeAccountingTypeAcctMthEndFlagType;
	CashReserve: number;
	CurrentAccountingPeriod: PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodType;
	CurrentAccountingPeriodAP: PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodAPType;
	CurrentAccountingPeriodAR: PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodARType;
	EndOfYear: PhysicalPropertyTypePropertyTypeAccountingTypeEndOfYearType;
	GeneralLedger: PhysicalPropertyTypePropertyTypeAccountingTypeGeneralLedgerType;
	LastAccMthEnd: PhysicalPropertyTypePropertyTypeAccountingTypeLastAccMthEndType;
	LastDayBegin: PhysicalPropertyTypePropertyTypeAccountingTypeLastDayBeginType;
	LastDayEnd: PhysicalPropertyTypePropertyTypeAccountingTypeLastDayEndType;
	LastInvoiceNumber: string;
	LastReceiptNumber: string;
	LiveDate: PhysicalPropertyTypePropertyTypeAccountingTypeLiveDateType;
	LiveFlag: boolean;
	TaxCredit: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingType extends _PhysicalPropertyTypePropertyTypeAccountingType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingType }; }

interface _PhysicalPropertyTypePropertyTypeAccountingTypeAccountsPayableType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingTypeAccountsPayableType extends _PhysicalPropertyTypePropertyTypeAccountingTypeAccountsPayableType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingTypeAccountsPayableType }; }

interface _PhysicalPropertyTypePropertyTypeAccountingTypeAccountsReceivableType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingTypeAccountsReceivableType extends _PhysicalPropertyTypePropertyTypeAccountingTypeAccountsReceivableType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingTypeAccountsReceivableType }; }

type PhysicalPropertyTypePropertyTypeAccountingTypeAcctMthEndFlagType = ("Preliminary" | "Changes" | "Month Closed" | "None");
interface _PhysicalPropertyTypePropertyTypeAccountingTypeAcctMthEndFlagType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeAccountingTypeAcctMthEndFlagType; }

interface _PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodAPType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodAPType extends _PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodAPType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodAPType }; }

interface _PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodARType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodARType extends _PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodARType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodARType }; }

interface _PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodType extends _PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingTypeCurrentAccountingPeriodType }; }

interface _PhysicalPropertyTypePropertyTypeAccountingTypeEndOfYearType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingTypeEndOfYearType extends _PhysicalPropertyTypePropertyTypeAccountingTypeEndOfYearType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingTypeEndOfYearType }; }

interface _PhysicalPropertyTypePropertyTypeAccountingTypeGeneralLedgerType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingTypeGeneralLedgerType extends _PhysicalPropertyTypePropertyTypeAccountingTypeGeneralLedgerType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingTypeGeneralLedgerType }; }

interface _PhysicalPropertyTypePropertyTypeAccountingTypeLastAccMthEndType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingTypeLastAccMthEndType extends _PhysicalPropertyTypePropertyTypeAccountingTypeLastAccMthEndType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingTypeLastAccMthEndType }; }

interface _PhysicalPropertyTypePropertyTypeAccountingTypeLastDayBeginType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingTypeLastDayBeginType extends _PhysicalPropertyTypePropertyTypeAccountingTypeLastDayBeginType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingTypeLastDayBeginType }; }

interface _PhysicalPropertyTypePropertyTypeAccountingTypeLastDayEndType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingTypeLastDayEndType extends _PhysicalPropertyTypePropertyTypeAccountingTypeLastDayEndType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingTypeLastDayEndType }; }

type PhysicalPropertyTypePropertyTypeAccountingTypeLastInvoiceNumberType = string;
type _PhysicalPropertyTypePropertyTypeAccountingTypeLastInvoiceNumberType = Primitive._string;

type PhysicalPropertyTypePropertyTypeAccountingTypeLastReceiptNumberType = string;
type _PhysicalPropertyTypePropertyTypeAccountingTypeLastReceiptNumberType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeAccountingTypeLiveDateType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeAccountingTypeLiveDateType extends _PhysicalPropertyTypePropertyTypeAccountingTypeLiveDateType { constructor: { new(): PhysicalPropertyTypePropertyTypeAccountingTypeLiveDateType }; }

type PhysicalPropertyTypePropertyTypeAccountingTypeTaxCreditType = string;
type _PhysicalPropertyTypePropertyTypeAccountingTypeTaxCreditType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeBuildingType extends _Identification {
	/** General Amenity Type */
	Amenity?: GeneralAmenityType[];
	/** Building Type */
	BuildingType?: PhysicalPropertyTypePropertyTypeBuildingTypeBuildingTypeType;
	/** Building Description */
	Description: string;
	/** Id, Active */
	File?: FileType[];
	/** Unique Identifier for building (it is unclear if this has independent value form PropertyID) */
	Name: string;
	/** Total external square footage of building */
	SquareFeet: number;
	/** Number of units in this building */
	UnitCount: number;
}
interface PhysicalPropertyTypePropertyTypeBuildingType extends _PhysicalPropertyTypePropertyTypeBuildingType { constructor: { new(): PhysicalPropertyTypePropertyTypeBuildingType }; }

type PhysicalPropertyTypePropertyTypeBuildingTypeBuildingTypeType = ("High Rise" | "Garden Style" | "Mid Rise" | "Mixed Use" | "Standard" | "Unspecified" | "Low Rise" | "House for Rent" | "Condo for Rent" | "Walkup" | "Coach House" | "Townhouse" | "Courtyard");
interface _PhysicalPropertyTypePropertyTypeBuildingTypeBuildingTypeType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeBuildingTypeBuildingTypeType; }

type PhysicalPropertyTypePropertyTypeBuildingTypeDescriptionType = string;
type _PhysicalPropertyTypePropertyTypeBuildingTypeDescriptionType = Primitive._string;

type PhysicalPropertyTypePropertyTypeBuildingTypeNameType = string;
type _PhysicalPropertyTypePropertyTypeBuildingTypeNameType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeConcessionType extends _ConcessionType {}
interface PhysicalPropertyTypePropertyTypeConcessionType extends _PhysicalPropertyTypePropertyTypeConcessionType { constructor: { new(): PhysicalPropertyTypePropertyTypeConcessionType }; }

interface _PhysicalPropertyTypePropertyTypeFeeType extends _FeeType {
	AdminFee: number;
	ApplicationFee: number;
	BrokerFee: number;
}
interface PhysicalPropertyTypePropertyTypeFeeType extends _PhysicalPropertyTypePropertyTypeFeeType { constructor: { new(): PhysicalPropertyTypePropertyTypeFeeType }; }

interface _PhysicalPropertyTypePropertyTypeFloorplanType extends _Identification {
	Amenity?: SpecificAmenityType[];
	Comment?: string;
	/** Active */
	Concession?: ConcessionType[];
	Deposit?: DepositType[];
	DisplayedUnitsAvailable?: number;
	EffectiveRent: PhysicalPropertyTypePropertyTypeFloorplanTypeEffectiveRentType;
	Fee?: PhysicalPropertyTypePropertyTypeFloorplanTypeFeeType;
	/** Id, Active */
	File?: FileType[];
	FloorCount?: number;
	FloorplanAvailabilityURL?: string;
	FloorplanType?: PhysicalPropertyTypePropertyTypeFloorplanTypeFloorplanTypeType;
	LeaseTerm?: PhysicalPropertyTypePropertyTypeFloorplanTypeLeaseTermType;
	MarketRent: PhysicalPropertyTypePropertyTypeFloorplanTypeMarketRentType;
	Name: string;
	/** Promotional Bullet Points for ILS Listings */
	Promotional?: string[];
	Room: RoomType[];
	/** Average, Min, Max */
	SquareFeet: PhysicalPropertyTypePropertyTypeFloorplanTypeSquareFeetType;
	TotalRoomCount?: number;
	UnitCount: number;
	UnitsAvailable?: number;
}
interface PhysicalPropertyTypePropertyTypeFloorplanType extends _PhysicalPropertyTypePropertyTypeFloorplanType { constructor: { new(): PhysicalPropertyTypePropertyTypeFloorplanType }; }

type PhysicalPropertyTypePropertyTypeFloorplanTypeCommentType = string;
type _PhysicalPropertyTypePropertyTypeFloorplanTypeCommentType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeFloorplanTypeEffectiveRentType extends BaseType {
	Avg?: number;
	Max: number;
	Min: number;
}
interface PhysicalPropertyTypePropertyTypeFloorplanTypeEffectiveRentType extends _PhysicalPropertyTypePropertyTypeFloorplanTypeEffectiveRentType { constructor: { new(): PhysicalPropertyTypePropertyTypeFloorplanTypeEffectiveRentType }; }

interface _PhysicalPropertyTypePropertyTypeFloorplanTypeFeeType extends _FeeType {
	AdminFee: number;
	ApplicationFee: number;
	BrokerFee: number;
}
interface PhysicalPropertyTypePropertyTypeFloorplanTypeFeeType extends _PhysicalPropertyTypePropertyTypeFloorplanTypeFeeType { constructor: { new(): PhysicalPropertyTypePropertyTypeFloorplanTypeFeeType }; }

type PhysicalPropertyTypePropertyTypeFloorplanTypeFloorplanAvailabilityURLType = string;
type _PhysicalPropertyTypePropertyTypeFloorplanTypeFloorplanAvailabilityURLType = Primitive._string;

type PhysicalPropertyTypePropertyTypeFloorplanTypeFloorplanTypeType = ("Internal" | "External");
interface _PhysicalPropertyTypePropertyTypeFloorplanTypeFloorplanTypeType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeFloorplanTypeFloorplanTypeType; }

interface _PhysicalPropertyTypePropertyTypeFloorplanTypeLeaseTermType extends BaseType {
	Avg?: number;
	Max: number;
	Min: number;
}
interface PhysicalPropertyTypePropertyTypeFloorplanTypeLeaseTermType extends _PhysicalPropertyTypePropertyTypeFloorplanTypeLeaseTermType { constructor: { new(): PhysicalPropertyTypePropertyTypeFloorplanTypeLeaseTermType }; }

interface _PhysicalPropertyTypePropertyTypeFloorplanTypeMarketRentType extends BaseType {
	Avg?: number;
	Max: number;
	Min: number;
}
interface PhysicalPropertyTypePropertyTypeFloorplanTypeMarketRentType extends _PhysicalPropertyTypePropertyTypeFloorplanTypeMarketRentType { constructor: { new(): PhysicalPropertyTypePropertyTypeFloorplanTypeMarketRentType }; }

type PhysicalPropertyTypePropertyTypeFloorplanTypeNameType = string;
type _PhysicalPropertyTypePropertyTypeFloorplanTypeNameType = Primitive._string;

type PhysicalPropertyTypePropertyTypeFloorplanTypePromotionalType = string;
type _PhysicalPropertyTypePropertyTypeFloorplanTypePromotionalType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeFloorplanTypeSquareFeetType extends BaseType {
	Avg?: number;
	Max: number;
	Min: number;
}
interface PhysicalPropertyTypePropertyTypeFloorplanTypeSquareFeetType extends _PhysicalPropertyTypePropertyTypeFloorplanTypeSquareFeetType { constructor: { new(): PhysicalPropertyTypePropertyTypeFloorplanTypeSquareFeetType }; }

interface _PhysicalPropertyTypePropertyTypeILS_IdentificationType extends BaseType {
	ILS_IdentificationType: PhysicalPropertyTypePropertyTypeILS_IdentificationTypeILS_IdentificationTypeType;
	RentalType: PhysicalPropertyTypePropertyTypeILS_IdentificationTypeRentalTypeType;
	/** Daylight savings time for the selected time zone */
	DaylightSaving?: boolean;
	LastUpdate?: PhysicalPropertyTypePropertyTypeILS_IdentificationTypeLastUpdateType;
	/** Latitude position of property */
	Latitude?: number;
	/** Longitude position of property */
	Longitude?: number;
	TimeZone?: string;
}
interface PhysicalPropertyTypePropertyTypeILS_IdentificationType extends _PhysicalPropertyTypePropertyTypeILS_IdentificationType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_IdentificationType }; }

type PhysicalPropertyTypePropertyTypeILS_IdentificationTypeILS_IdentificationTypeType = ("Apartment" | "Condo" | "Duplex" | "Triplex" | "4plex" | "Senior" | "Assisted Living" | "Subsidized" | "High Rise" | "Garden Style" | "Mid Rise" | "Mixed Use" | "Townhouse" | "Vacation" | "Campus" | "Military" | "House for Rent" | "Corporate" | "Unspecified");
interface _PhysicalPropertyTypePropertyTypeILS_IdentificationTypeILS_IdentificationTypeType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeILS_IdentificationTypeILS_IdentificationTypeType; }

interface _PhysicalPropertyTypePropertyTypeILS_IdentificationTypeLastUpdateType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeILS_IdentificationTypeLastUpdateType extends _PhysicalPropertyTypePropertyTypeILS_IdentificationTypeLastUpdateType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_IdentificationTypeLastUpdateType }; }

type PhysicalPropertyTypePropertyTypeILS_IdentificationTypeRentalTypeType = ("Subsidized" | "Assisted Senior" | "Assisted Living" | "Market Rate" | "Unspecified" | "Broker" | "Student" | "Temporary");
interface _PhysicalPropertyTypePropertyTypeILS_IdentificationTypeRentalTypeType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeILS_IdentificationTypeRentalTypeType; }

type PhysicalPropertyTypePropertyTypeILS_IdentificationTypeTimeZoneType = string;
type _PhysicalPropertyTypePropertyTypeILS_IdentificationTypeTimeZoneType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeILS_UnitType extends _Identification {
	/** Type */
	Affordable?: PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableType;
	Amenity?: SpecificAmenityType[];
	ApplianceColorCode?: string;
	Availability?: PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityType;
	Cancellation?: PhysicalPropertyTypePropertyTypeILS_UnitTypeCancellationType;
	CarpetCode?: string;
	CarpetReplacedDate?: PhysicalPropertyTypePropertyTypeILS_UnitTypeCarpetReplacedDateType;
	ChangeDate?: PhysicalPropertyTypePropertyTypeILS_UnitTypeChangeDateType;
	/** Active */
	Concession?: ConcessionType[];
	Deposit?: DepositType;
	EffectiveRent?: PhysicalPropertyTypePropertyTypeILS_UnitTypeEffectiveRentType;
	EntryFloor?: string;
	Fee?: FeeType;
	/** Id, Active */
	File?: FileType[];
	FloorLevel?: string;
	NumberOfFloors?: string;
	PaintedDate?: PhysicalPropertyTypePropertyTypeILS_UnitTypePaintedDateType;
	Pricing?: PricingType;
	PriorMarket?: number;
	ProfitCenter?: string;
	/** Promotional Bullet Points for ILS Listings */
	Promotional?: string[];
	/** Description of special accomodations for subject unit. */
	SpecialAccess?: string;
	StandardRenewal?: number;
	/** MITS 4.0 UnitsType */
	Units: UnitsType;
	UserOption?: string;
}
interface PhysicalPropertyTypePropertyTypeILS_UnitType extends _PhysicalPropertyTypePropertyTypeILS_UnitType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_UnitType }; }

interface _PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableType extends BaseType {
	AffordableType: PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableTypeAffordableTypeType;
	Allowance: number;
	ContractRent: number;
	Program: string;
}
interface PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableType extends _PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableType }; }

type PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableTypeAffordableTypeType = ("Tax Credit" | "HUD" | "Other" | "Unspecified");
interface _PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableTypeAffordableTypeType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableTypeAffordableTypeType; }

type PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableTypeContractRentType = number;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableTypeContractRentType = Primitive._number;

type PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableTypeProgramType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeAffordableTypeProgramType = Primitive._string;

type PhysicalPropertyTypePropertyTypeILS_UnitTypeApplianceColorCodeType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeApplianceColorCodeType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityType extends BaseType {
	CancellationCode?: string;
	CancellationDescription?: string;
	MadeReadyDate: PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeMadeReadyDateType;
	MoveOutCode?: string;
	MoveOutDescription?: string;
	UnitAvailabilityURL?: string;
	/** Vacancy status of subject unit. */
	VacancyClass: PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeVacancyClassType;
	VacateDate: PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeVacateDateType;
}
interface PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityType extends _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityType }; }

type PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeCancellationCodeType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeCancellationCodeType = Primitive._string;

type PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeCancellationDescriptionType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeCancellationDescriptionType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeMadeReadyDateType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeMadeReadyDateType extends _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeMadeReadyDateType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeMadeReadyDateType }; }

type PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeMoveOutCodeType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeMoveOutCodeType = Primitive._string;

type PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeMoveOutDescriptionType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeMoveOutDescriptionType = Primitive._string;

type PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeUnitAvailabilityURLType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeUnitAvailabilityURLType = Primitive._string;

type PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeVacancyClassType = ("Occupied" | "Unoccupied");
interface _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeVacancyClassType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeVacancyClassType; }

interface _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeVacateDateType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeVacateDateType extends _PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeVacateDateType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_UnitTypeAvailabilityTypeVacateDateType }; }

interface _PhysicalPropertyTypePropertyTypeILS_UnitTypeCancellationType extends BaseType {
	Reason: string;
}
interface PhysicalPropertyTypePropertyTypeILS_UnitTypeCancellationType extends _PhysicalPropertyTypePropertyTypeILS_UnitTypeCancellationType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_UnitTypeCancellationType }; }

type PhysicalPropertyTypePropertyTypeILS_UnitTypeCancellationTypeReasonType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeCancellationTypeReasonType = Primitive._string;

type PhysicalPropertyTypePropertyTypeILS_UnitTypeCarpetCodeType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeCarpetCodeType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeILS_UnitTypeCarpetReplacedDateType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeILS_UnitTypeCarpetReplacedDateType extends _PhysicalPropertyTypePropertyTypeILS_UnitTypeCarpetReplacedDateType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_UnitTypeCarpetReplacedDateType }; }

interface _PhysicalPropertyTypePropertyTypeILS_UnitTypeChangeDateType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeILS_UnitTypeChangeDateType extends _PhysicalPropertyTypePropertyTypeILS_UnitTypeChangeDateType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_UnitTypeChangeDateType }; }

interface _PhysicalPropertyTypePropertyTypeILS_UnitTypeEffectiveRentType extends BaseType {
	Avg?: number;
	Max: number;
	Min: number;
}
interface PhysicalPropertyTypePropertyTypeILS_UnitTypeEffectiveRentType extends _PhysicalPropertyTypePropertyTypeILS_UnitTypeEffectiveRentType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_UnitTypeEffectiveRentType }; }

type PhysicalPropertyTypePropertyTypeILS_UnitTypeEntryFloorType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeEntryFloorType = Primitive._string;

type PhysicalPropertyTypePropertyTypeILS_UnitTypeFloorLevelType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeFloorLevelType = Primitive._string;

type PhysicalPropertyTypePropertyTypeILS_UnitTypeNumberOfFloorsType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeNumberOfFloorsType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeILS_UnitTypePaintedDateType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeILS_UnitTypePaintedDateType extends _PhysicalPropertyTypePropertyTypeILS_UnitTypePaintedDateType { constructor: { new(): PhysicalPropertyTypePropertyTypeILS_UnitTypePaintedDateType }; }

type PhysicalPropertyTypePropertyTypeILS_UnitTypeProfitCenterType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeProfitCenterType = Primitive._string;

type PhysicalPropertyTypePropertyTypeILS_UnitTypePromotionalType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypePromotionalType = Primitive._string;

type PhysicalPropertyTypePropertyTypeILS_UnitTypeSpecialAccessType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeSpecialAccessType = Primitive._string;

type PhysicalPropertyTypePropertyTypeILS_UnitTypeUserOptionType = string;
type _PhysicalPropertyTypePropertyTypeILS_UnitTypeUserOptionType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeILSType extends BaseType {
	/** Type */
	Commission: PhysicalPropertyTypePropertyTypeILSTypeCommissionType;
}
interface PhysicalPropertyTypePropertyTypeILSType extends _PhysicalPropertyTypePropertyTypeILSType { constructor: { new(): PhysicalPropertyTypePropertyTypeILSType }; }

interface _PhysicalPropertyTypePropertyTypeILSTypeCommissionType extends BaseType {
	CommissionType: string;
	Amount: number;
	AmountPosted: number;
	ContractExpire: PhysicalPropertyTypePropertyTypeILSTypeCommissionTypeContractExpireType;
	Minimum: number;
}
interface PhysicalPropertyTypePropertyTypeILSTypeCommissionType extends _PhysicalPropertyTypePropertyTypeILSTypeCommissionType { constructor: { new(): PhysicalPropertyTypePropertyTypeILSTypeCommissionType }; }

type PhysicalPropertyTypePropertyTypeILSTypeCommissionTypeCommissionTypeType = string;
type _PhysicalPropertyTypePropertyTypeILSTypeCommissionTypeCommissionTypeType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeILSTypeCommissionTypeContractExpireType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeILSTypeCommissionTypeContractExpireType extends _PhysicalPropertyTypePropertyTypeILSTypeCommissionTypeContractExpireType { constructor: { new(): PhysicalPropertyTypePropertyTypeILSTypeCommissionTypeContractExpireType }; }

interface _PhysicalPropertyTypePropertyTypeInformationType extends BaseType {
	AcquisitionDate?: PhysicalPropertyTypePropertyTypeInformationTypeAcquisitionDateType;
	BuildingCount?: number;
	DrivingDirections?: string;
	IncomeRentQual?: PhysicalPropertyTypePropertyTypeInformationTypeIncomeRentQualType[];
	LeaseLength?: string;
	LongDescription?: string;
	NumberOfAcres?: number;
	OfficeHour?: PhysicalPropertyTypePropertyTypeInformationTypeOfficeHourType[];
	/** Type */
	Parking?: PhysicalPropertyTypePropertyTypeInformationTypeParkingType[];
	PropertyAvailabilityURL?: string;
	Rents?: PhysicalPropertyTypePropertyTypeInformationTypeRentsType;
	/** Nearest */
	Services?: PhysicalPropertyTypePropertyTypeInformationTypeServicesType[];
	ShortDescription?: string;
	StructureType: PhysicalPropertyTypePropertyTypeInformationTypeStructureTypeType;
	UnitCount: number;
	YearBuilt?: string;
	YearRemodeled?: string;
}
interface PhysicalPropertyTypePropertyTypeInformationType extends _PhysicalPropertyTypePropertyTypeInformationType { constructor: { new(): PhysicalPropertyTypePropertyTypeInformationType }; }

interface _PhysicalPropertyTypePropertyTypeInformationTypeAcquisitionDateType extends BaseType {
	Day: string;
	Month: string;
	Year: string;
}
interface PhysicalPropertyTypePropertyTypeInformationTypeAcquisitionDateType extends _PhysicalPropertyTypePropertyTypeInformationTypeAcquisitionDateType { constructor: { new(): PhysicalPropertyTypePropertyTypeInformationTypeAcquisitionDateType }; }

type PhysicalPropertyTypePropertyTypeInformationTypeDrivingDirectionsType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypeDrivingDirectionsType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeInformationTypeIncomeRentQualType extends BaseType {
	Persons: PhysicalPropertyTypePropertyTypeInformationTypeIncomeRentQualTypePersonsType;
	IncomeLimit?: number;
	QualifiedRent?: number;
}
interface PhysicalPropertyTypePropertyTypeInformationTypeIncomeRentQualType extends _PhysicalPropertyTypePropertyTypeInformationTypeIncomeRentQualType { constructor: { new(): PhysicalPropertyTypePropertyTypeInformationTypeIncomeRentQualType }; }

type PhysicalPropertyTypePropertyTypeInformationTypeIncomeRentQualTypePersonsType = ("1" | "2" | "3" | "4" | "5" | "6");
interface _PhysicalPropertyTypePropertyTypeInformationTypeIncomeRentQualTypePersonsType extends Primitive._number { content: PhysicalPropertyTypePropertyTypeInformationTypeIncomeRentQualTypePersonsType; }

type PhysicalPropertyTypePropertyTypeInformationTypeLeaseLengthType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypeLeaseLengthType = Primitive._string;

type PhysicalPropertyTypePropertyTypeInformationTypeLongDescriptionType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypeLongDescriptionType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeInformationTypeOfficeHourType extends BaseType {
	CloseTime: string;
	/** Days open: Su, M, T, W, Th, F, Sa */
	Day: string;
	OpenTime: string;
}
interface PhysicalPropertyTypePropertyTypeInformationTypeOfficeHourType extends _PhysicalPropertyTypePropertyTypeInformationTypeOfficeHourType { constructor: { new(): PhysicalPropertyTypePropertyTypeInformationTypeOfficeHourType }; }

type PhysicalPropertyTypePropertyTypeInformationTypeOfficeHourTypeCloseTimeType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypeOfficeHourTypeCloseTimeType = Primitive._string;

type PhysicalPropertyTypePropertyTypeInformationTypeOfficeHourTypeDayType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypeOfficeHourTypeDayType = Primitive._string;

type PhysicalPropertyTypePropertyTypeInformationTypeOfficeHourTypeOpenTimeType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypeOfficeHourTypeOpenTimeType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeInformationTypeParkingType extends BaseType {
	ParkingType: PhysicalPropertyTypePropertyTypeInformationTypeParkingTypeParkingTypeType;
	Assigned?: boolean;
	AssignedFee?: PhysicalPropertyTypePropertyTypeInformationTypeParkingTypeAssignedFeeType;
	Comment?: string;
	SpaceFee?: number;
	Spaces?: number;
}
interface PhysicalPropertyTypePropertyTypeInformationTypeParkingType extends _PhysicalPropertyTypePropertyTypeInformationTypeParkingType { constructor: { new(): PhysicalPropertyTypePropertyTypeInformationTypeParkingType }; }

type PhysicalPropertyTypePropertyTypeInformationTypeParkingTypeAssignedFeeType = ("Free" | "Paid" | "Both");
interface _PhysicalPropertyTypePropertyTypeInformationTypeParkingTypeAssignedFeeType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeInformationTypeParkingTypeAssignedFeeType; }

type PhysicalPropertyTypePropertyTypeInformationTypeParkingTypeCommentType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypeParkingTypeCommentType = Primitive._string;

type PhysicalPropertyTypePropertyTypeInformationTypeParkingTypeParkingTypeType = ("Surface Lot" | "Garage Lot" | "Covered Lot" | "Street" | "Other" | "None");
interface _PhysicalPropertyTypePropertyTypeInformationTypeParkingTypeParkingTypeType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeInformationTypeParkingTypeParkingTypeType; }

type PhysicalPropertyTypePropertyTypeInformationTypePropertyAvailabilityURLType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypePropertyAvailabilityURLType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypeInformationTypeRentsType extends BaseType {
	CorporateRent?: PhysicalPropertyTypePropertyTypeInformationTypeRentsTypeCorporateRentType;
	SalePrice?: number;
	StandardRent?: number;
	StartRent?: number;
}
interface PhysicalPropertyTypePropertyTypeInformationTypeRentsType extends _PhysicalPropertyTypePropertyTypeInformationTypeRentsType { constructor: { new(): PhysicalPropertyTypePropertyTypeInformationTypeRentsType }; }

interface _PhysicalPropertyTypePropertyTypeInformationTypeRentsTypeCorporateRentType extends BaseType {
	Max?: number;
	Min?: number;
}
interface PhysicalPropertyTypePropertyTypeInformationTypeRentsTypeCorporateRentType extends _PhysicalPropertyTypePropertyTypeInformationTypeRentsTypeCorporateRentType { constructor: { new(): PhysicalPropertyTypePropertyTypeInformationTypeRentsTypeCorporateRentType }; }

interface _PhysicalPropertyTypePropertyTypeInformationTypeServicesType extends BaseType {
	Nearest: boolean;
	Comment?: string;
	Detail?: string;
	DistanceTo?: string;
	Name: PhysicalPropertyTypePropertyTypeInformationTypeServicesTypeNameType;
}
interface PhysicalPropertyTypePropertyTypeInformationTypeServicesType extends _PhysicalPropertyTypePropertyTypeInformationTypeServicesType { constructor: { new(): PhysicalPropertyTypePropertyTypeInformationTypeServicesType }; }

type PhysicalPropertyTypePropertyTypeInformationTypeServicesTypeCommentType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypeServicesTypeCommentType = Primitive._string;

type PhysicalPropertyTypePropertyTypeInformationTypeServicesTypeDetailType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypeServicesTypeDetailType = Primitive._string;

type PhysicalPropertyTypePropertyTypeInformationTypeServicesTypeDistanceToType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypeServicesTypeDistanceToType = Primitive._string;

type PhysicalPropertyTypePropertyTypeInformationTypeServicesTypeNameType = ("Bus" | "Elementary School" | "Middle School" | "High School" | "Highway" | "Laundromat" | "Drycleaner" | "Park" | "Train" | "University" | "Other");
interface _PhysicalPropertyTypePropertyTypeInformationTypeServicesTypeNameType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeInformationTypeServicesTypeNameType; }

type PhysicalPropertyTypePropertyTypeInformationTypeShortDescriptionType = string;
type _PhysicalPropertyTypePropertyTypeInformationTypeShortDescriptionType = Primitive._string;

type PhysicalPropertyTypePropertyTypeInformationTypeStructureTypeType = ("Standard" | "High Rise" | "Garden Style" | "Mid Rise" | "Mixed Use" | "Unspecified");
interface _PhysicalPropertyTypePropertyTypeInformationTypeStructureTypeType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeInformationTypeStructureTypeType; }

interface _PhysicalPropertyTypePropertyTypeLeadChannelListType extends BaseType {
	/** LeadChannel defines a group of communication mechanisms to transmit leads for the parent property.  It is oriented along product lines.  For example, if the property is published at an ILS in the context of a certain product, it will have a number of LeadNotifications like email, or phone.  If it is published in the context of a different product, it might have a different set of LeadNotifications. */
	LeadChannel: LeadChannelType[];
}
interface PhysicalPropertyTypePropertyTypeLeadChannelListType extends _PhysicalPropertyTypePropertyTypeLeadChannelListType { constructor: { new(): PhysicalPropertyTypePropertyTypeLeadChannelListType }; }

interface _PhysicalPropertyTypePropertyTypePaymentType extends BaseType {
	CheckPayable: string;
	Method: PhysicalPropertyTypePropertyTypePaymentTypeMethodType;
	RemitTo: string;
}
interface PhysicalPropertyTypePropertyTypePaymentType extends _PhysicalPropertyTypePropertyTypePaymentType { constructor: { new(): PhysicalPropertyTypePropertyTypePaymentType }; }

type PhysicalPropertyTypePropertyTypePaymentTypeCheckPayableType = string;
type _PhysicalPropertyTypePropertyTypePaymentTypeCheckPayableType = Primitive._string;

type PhysicalPropertyTypePropertyTypePaymentTypeMethodType = ("Cash" | "Check" | "CreditCard" | "Insurance" | "CorporateBilling" | "PerDiem");
interface _PhysicalPropertyTypePropertyTypePaymentTypeMethodType extends Primitive._string { content: PhysicalPropertyTypePropertyTypePaymentTypeMethodType; }

interface _PhysicalPropertyTypePropertyTypePhaseType extends _Identification {
	Amenity?: GeneralAmenityType[];
	Description: string;
	/** Id, Active */
	File?: FileType[];
	Name: string;
	/** Promotional Bullet Points for ILS Listings */
	Promotional?: string[];
	RentableSquareFeet: number;
	RentableUnits: number;
	TotalSquareFeet: number;
	UnitCount: number;
}
interface PhysicalPropertyTypePropertyTypePhaseType extends _PhysicalPropertyTypePropertyTypePhaseType { constructor: { new(): PhysicalPropertyTypePropertyTypePhaseType }; }

type PhysicalPropertyTypePropertyTypePhaseTypeDescriptionType = string;
type _PhysicalPropertyTypePropertyTypePhaseTypeDescriptionType = Primitive._string;

type PhysicalPropertyTypePropertyTypePhaseTypeNameType = string;
type _PhysicalPropertyTypePropertyTypePhaseTypeNameType = Primitive._string;

type PhysicalPropertyTypePropertyTypePhaseTypePromotionalType = string;
type _PhysicalPropertyTypePropertyTypePhaseTypePromotionalType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypePolicyType extends BaseType {
	/** General Policy */
	General?: string;
	/** Allowed */
	Pet: PhysicalPropertyTypePropertyTypePolicyTypePetType[];
}
interface PhysicalPropertyTypePropertyTypePolicyType extends _PhysicalPropertyTypePropertyTypePolicyType { constructor: { new(): PhysicalPropertyTypePropertyTypePolicyType }; }

type PhysicalPropertyTypePropertyTypePolicyTypeGeneralType = string;
type _PhysicalPropertyTypePropertyTypePolicyTypeGeneralType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypePolicyTypePetType extends BaseType {
	Allowed: boolean;
	Comment?: string;
	Deposit?: number;
	Fee?: number;
	/** Min, Max */
	FeeRange?: PhysicalPropertyTypePropertyTypePolicyTypePetTypeFeeRangeType;
	PetCare?: boolean;
	/** Details about various prospect pets */
	Pets?: PhysicalPropertyTypePropertyTypePolicyTypePetTypePetsType[];
	Rent?: number;
	Restrictions?: string;
}
interface PhysicalPropertyTypePropertyTypePolicyTypePetType extends _PhysicalPropertyTypePropertyTypePolicyTypePetType { constructor: { new(): PhysicalPropertyTypePropertyTypePolicyTypePetType }; }

type PhysicalPropertyTypePropertyTypePolicyTypePetTypeCommentType = string;
type _PhysicalPropertyTypePropertyTypePolicyTypePetTypeCommentType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypePolicyTypePetTypeFeeRangeType extends BaseType {
	Max?: number;
	Min?: number;
}
interface PhysicalPropertyTypePropertyTypePolicyTypePetTypeFeeRangeType extends _PhysicalPropertyTypePropertyTypePolicyTypePetTypeFeeRangeType { constructor: { new(): PhysicalPropertyTypePropertyTypePolicyTypePetTypeFeeRangeType }; }

interface _PhysicalPropertyTypePropertyTypePolicyTypePetTypePetsType extends _PetType {}
interface PhysicalPropertyTypePropertyTypePolicyTypePetTypePetsType extends _PhysicalPropertyTypePropertyTypePolicyTypePetTypePetsType { constructor: { new(): PhysicalPropertyTypePropertyTypePolicyTypePetTypePetsType }; }

type PhysicalPropertyTypePropertyTypePolicyTypePetTypeRestrictionsType = string;
type _PhysicalPropertyTypePropertyTypePolicyTypePetTypeRestrictionsType = Primitive._string;

type PhysicalPropertyTypePropertyTypePromotionalType = string;
type _PhysicalPropertyTypePropertyTypePromotionalType = Primitive._string;

interface _PhysicalPropertyTypePropertyTypePropertyIDType extends _PropertyType {}
interface PhysicalPropertyTypePropertyTypePropertyIDType extends _PhysicalPropertyTypePropertyTypePropertyIDType { constructor: { new(): PhysicalPropertyTypePropertyTypePropertyIDType }; }

interface _PhysicalPropertyTypePropertyTypeUtilityType extends BaseType {
	MajorUtility: PhysicalPropertyTypePropertyTypeUtilityTypeMajorUtilityType;
	AirCon: boolean;
	BroadbandInternet: boolean;
	Cable: boolean;
	Electric: boolean;
	Gas: boolean;
	Heat: boolean;
	HotWater: boolean;
	Satellite: boolean;
	Sewer: boolean;
	Telephone: boolean;
	Trash: boolean;
	UtilityPortionIncluded?: number;
	Water: boolean;
}
interface PhysicalPropertyTypePropertyTypeUtilityType extends _PhysicalPropertyTypePropertyTypeUtilityType { constructor: { new(): PhysicalPropertyTypePropertyTypeUtilityType }; }

type PhysicalPropertyTypePropertyTypeUtilityTypeMajorUtilityType = ("Some" | "None" | "Unspecified");
interface _PhysicalPropertyTypePropertyTypeUtilityTypeMajorUtilityType extends Primitive._string { content: PhysicalPropertyTypePropertyTypeUtilityTypeMajorUtilityType; }

interface _PricingType extends BaseType {
	MITSOfferTerm?: PricingTypeMITSOfferTermType[];
}
export interface PricingType extends _PricingType { constructor: { new(): PricingType }; }
export var PricingType: { new(): PricingType };

interface _PricingTypeMITSOfferTermType extends _OfferTermType {}
interface PricingTypeMITSOfferTermType extends _PricingTypeMITSOfferTermType { constructor: { new(): PricingTypeMITSOfferTermType }; }

/** This is a simple container for PropertyType */
interface _PropertiesType extends BaseType {
	Property: PropertyType[];
}
export interface PropertiesType extends _PropertiesType { constructor: { new(): PropertiesType }; }
export var PropertiesType: { new(): PropertiesType };

export type PropertyContactsInfo = ("manager" | "owner" | "vendor" | "accountant" | "tax_accountant" | "lawyer" | "asset_manager" | "lender" | "investor" | "employer" | "previous_employer" | "bank" | "other");
interface _PropertyContactsInfo extends Primitive._string { content: PropertyContactsInfo; }

/** This is a container for PropertyContactType */
interface _PropertyContactsType extends BaseType {
	PropertyContact: CompanyContactType[];
}
export interface PropertyContactsType extends _PropertyContactsType { constructor: { new(): PropertyContactsType }; }
export var PropertyContactsType: { new(): PropertyContactsType };

/** Defines a group of nodes that identify the processing status of the uploaded property data. */
interface _PropertyDataUploadResponseType extends BaseType {
	completeDocumentRecieved: StatusTypes;
}
export interface PropertyDataUploadResponseType extends _PropertyDataUploadResponseType { constructor: { new(): PropertyDataUploadResponseType }; }
export var PropertyDataUploadResponseType: { new(): PropertyDataUploadResponseType };

export type PropertyIDInfo = ("market rate apt" | "condominium" | "cooperative" | "senior" | "assisted_living" | "subsidized" | "military" | "nursing" | "home" | "student" | "other");
interface _PropertyIDInfo extends Primitive._string { content: PropertyIDInfo; }

/** Element describes Property information, including identification
  *
  * MarketingName
  * Property name used for marketing purposes
  * APN
  * APN
  * LegalName
  * Legal name of the property
  * MSA_Number
  * MSA Number
  * MSA_Name
  * MSA Name
  * StructureDescription
  * Type of building; lowrise, highrise, etc
  * WebSite
  * URL of the property web site
  * Address
  * Property address
  * Phone
  * Property phone number(s)
  * Email    (optional)
  * Email address  (optional) */
interface _PropertyType extends _Identifiable {
	Address?: AddressType[];
	APN?: string;
	Email?: string;
	LegalName?: string;
	MarketingName: string;
	MSA_Name?: string;
	MSA_Number?: number;
	Phone?: PhoneType[];
	StructureDescription?: string;
	WebSite?: string;
}
export interface PropertyType extends _PropertyType { constructor: { new(): PropertyType }; }
export var PropertyType: { new(): PropertyType };

interface _PropertyTypeExtended extends _PropertyType {
	status: StatusTypes;
	Reason: PropertyTypeExtendedReasonType;
}
export interface PropertyTypeExtended extends _PropertyTypeExtended { constructor: { new(): PropertyTypeExtended }; }
export var PropertyTypeExtended: { new(): PropertyTypeExtended };

interface _PropertyTypeExtendedReasonType extends BaseType {}
interface PropertyTypeExtendedReasonType extends _PropertyTypeExtendedReasonType { constructor: { new(): PropertyTypeExtendedReasonType }; }

interface _RoomType extends BaseType {
	RoomType: RoomTypeRoomTypeType;
	Comment: string;
	Count: number;
	Description?: string;
	GeneralType?: string;
	Size?: number;
}
export interface RoomType extends _RoomType { constructor: { new(): RoomType }; }
export var RoomType: { new(): RoomType };

type RoomTypeRoomTypeType = ("Bedroom" | "Bathroom" | "Dining Room" | "Kitchen" | "Sunroom" | "Eat in Kitchen" | "Den" | "Other");
interface _RoomTypeRoomTypeType extends Primitive._string { content: RoomTypeRoomTypeType; }

/** Amenities that belong to Properties with Senior Living Facilities */
interface _SeniorLivingAmenityType extends BaseType {
	AmenityType: SeniorLivingAmenityTypeAmenityTypeType;
	Description?: string;
	Rank?: number;
}
export interface SeniorLivingAmenityType extends _SeniorLivingAmenityType { constructor: { new(): SeniorLivingAmenityType }; }
export var SeniorLivingAmenityType: { new(): SeniorLivingAmenityType };

type SeniorLivingAmenityTypeAmenityTypeType = ("Other" | "SkilledNursing" | "IndependentLiving" | "ContinuedCareRetirement" | "AdultDayCare" | "AlzheimersMemoryCare");
interface _SeniorLivingAmenityTypeAmenityTypeType extends Primitive._string { content: SeniorLivingAmenityTypeAmenityTypeType; }

type SeniorLivingAmenityTypeDescriptionType = string;
type _SeniorLivingAmenityTypeDescriptionType = Primitive._string;

/** Amenities that belongs to unit or floorplan level 11/28/06 */
interface _SpecificAmenityType extends BaseType {
	AmenitySubType?: SpecificAmenityTypeAmenitySubTypeType;
	AmenityType: SpecificAmenityTypeAmenityTypeType;
	Description?: string;
	Rank?: number;
}
export interface SpecificAmenityType extends _SpecificAmenityType { constructor: { new(): SpecificAmenityType }; }
export var SpecificAmenityType: { new(): SpecificAmenityType };

type SpecificAmenityTypeAmenitySubTypeType = ("Central" | "Window" | "Wall" | "Gas" | "Gas or Electric" | "Luxury" | "Wood" | "Electric" | "Radiant" | "Decorative" | "Unspecified");
interface _SpecificAmenityTypeAmenitySubTypeType extends Primitive._string { content: SpecificAmenityTypeAmenitySubTypeType; }

type SpecificAmenityTypeAmenityTypeType = ("Other" | "AdditionalStorage" | "AirConditioner" | "Alarm" | "Balcony" | "Cable" | "Carpet" | "Carport" | "CeilingFan" | "ControlledAccess" | "Courtyard" | "DishWasher" | "Disposal" | "DoubleSinkVanity" | "Dryer" | "Fireplace" | "FramedMirrors" | "Furnished" | "Garage" | "Handrails" | "HardwoodFlooring" | "HardSurfaceCounterTops" | "Heat" | "IndividualClimateControl" | "IslandKitchen" | "LaminateCounterTops" | "VinylFlooring" | "LargeClosets" | "LinenCloset" | "Microwave" | "Pantry" | "Patio" | "PrivateBalcony" | "PrivatePatio" | "Range" | "Refrigerator" | "Satellite" | "Skylight" | "TileFlooring" | "VaultedCeiling" | "View" | "Washer" | "WheelChair" | "WD_Hookup" | "WindowCoverings" | "Other");
interface _SpecificAmenityTypeAmenityTypeType extends Primitive._string { content: SpecificAmenityTypeAmenityTypeType; }

type SpecificAmenityTypeDescriptionType = string;
type _SpecificAmenityTypeDescriptionType = Primitive._string;

type SpecificAmenityTypeRankType = number;
type _SpecificAmenityTypeRankType = Primitive._number;

export type StatusTypes = ("Success" | "Failure");
interface _StatusTypes extends Primitive._string { content: StatusTypes; }

/** String (Maximum 100 Characters) */
export type StringMax100Type = string;
type _StringMax100Type = Primitive._string;

/** String (Maximum 120 Characters) */
export type StringMax120Type = string;
type _StringMax120Type = Primitive._string;

/** String (Maximum 12 Characters) */
export type StringMax12Type = string;
type _StringMax12Type = Primitive._string;

/** String (Maximum 20 Characters) */
export type StringMax20Type = string;
type _StringMax20Type = Primitive._string;

/** String (Maximum 3 Characters) */
export type StringMax3Type = string;
type _StringMax3Type = Primitive._string;

/** String (Maximum 40 Characters) */
export type StringMax40Type = string;
type _StringMax40Type = Primitive._string;

/** String (Maximum 500 Characters) */
export type StringMax500Type = string;
type _StringMax500Type = Primitive._string;

/** String (Maximum 50 Characters) */
export type StringMax50Type = string;
type _StringMax50Type = Primitive._string;

/** String (Maximum 60 Characters) */
export type StringMax60Type = string;
type _StringMax60Type = Primitive._string;

/** String (Maximum 80 Characters) */
export type StringMax80Type = string;
type _StringMax80Type = Primitive._string;

export type UnitEconStatusInfo = ("residential" | "commercial" | "down" | "model" | "employee" | "construction" | "office" | "other");
interface _UnitEconStatusInfo extends Primitive._string { content: UnitEconStatusInfo; }

export type UnitLeaseStatusInfo = ("leased" | "available" | "approved" | "reserved" | "not_ready" | "on_notice" | "leased_on_notice" | "leased_reserved" | "other");
interface _UnitLeaseStatusInfo extends Primitive._string { content: UnitLeaseStatusInfo; }

export type UnitOccpStatusInfo = ("occupied" | "vacant");
interface _UnitOccpStatusInfo extends Primitive._string { content: UnitOccpStatusInfo; }

export type UnitSqftInfo = ("internal" | "external");
interface _UnitSqftInfo extends Primitive._string { content: UnitSqftInfo; }

/** This is a simple container for UnitType */
interface _UnitsType extends BaseType {
	Unit: UnitType[];
}
export interface UnitsType extends _UnitsType { constructor: { new(): UnitsType }; }
export var UnitsType: { new(): UnitsType };

/** Element describes Unit information, including identification
  *
  * MarketingName
  * Property name used for marketing purposes
  * UnitType
  * Unit Type
  * UnitBedrooms
  * Number of bedrooms in unit
  * UnitBathrooms
  * Number of bathrooms in unit
  * MinSquareFeet
  * Minimum Square ft. size of units with a range of sizes
  * MaxSquareFeet
  * Max Square ft. size of unit with a range of sizes
  * SquareFootType
  * Square foot of the unit as defined by the owner or manager
  * UnitRent
  * Unit effective rent
  * MarketRent
  * Market rent for this specific unit
  * UnitEconomicStatus
  * Economic status of the unit that describes the type of unit
  * UnitEconomicStatusDescription
  * Description of Other Economic Status
  * UnitOccupancyStatus
  * Occupied or Vacant Unit
  * UnitLeasedStatusDescription
  * Leased status of the unit
  * NumberOccupants
  * Current number of occupants, optional number of children
  * FloorplanName
  * Name of Floorplan for this unit
  * PhaseName
  * Name of Phase
  * BuildingName
  * Used in a case where buildings within a property are individually named
  * Address
  * Address of unit */
interface _UnitType extends _Identifiable {
	Address?: AddressType[];
	BuildingName?: string;
	FloorplanName?: string;
	MarketingName?: string;
	MarketRent?: number;
	MaxSquareFeet?: number;
	MinSquareFeet?: number;
	NumberOccupants?: CurrentNumberOccupantsType;
	PhaseName?: string;
	SquareFootType?: UnitSqftInfo;
	UnitBathrooms?: number;
	UnitBedrooms?: number;
	UnitEconomicStatus?: UnitEconStatusInfo;
	UnitEconomicStatusDescription?: string;
	UnitLeasedStatus?: UnitLeaseStatusInfo;
	UnitLeasedStatusDescription?: string;
	UnitOccupancyStatus?: UnitOccpStatusInfo;
	UnitRent?: number;
	UnitType?: string;
}
export interface UnitType extends _UnitType { constructor: { new(): UnitType }; }
export var UnitType: { new(): UnitType };

export interface document extends BaseType {
	/** MITS Property v4.1 Initial Draft 02/28/2012 */
	PhysicalProperty: PhysicalPropertyType;
}
export var document: document;
