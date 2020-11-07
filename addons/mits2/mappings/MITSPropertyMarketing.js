var MITSPropertyMarketing_Module_Factory = function () {
  var MITSPropertyMarketing = {
    name: 'MITSPropertyMarketing',
    typeInfos: [{
        localName: 'OfferTermType.DateRange.EndDate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CompanyContactType',
        propertyInfos: [{
            name: 'companyRef',
            elementName: {
              localPart: 'CompanyRef'
            },
            typeInfo: '.Identifiable'
          }, {
            name: 'companyRole',
            elementName: {
              localPart: 'CompanyRole'
            }
          }, {
            name: 'companyContacts',
            elementName: {
              localPart: 'CompanyContacts'
            },
            typeInfo: '.CompanyContactsType'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Floorplan',
        typeName: null,
        baseTypeInfo: '.Identification',
        propertyInfos: [{
            name: 'floorplanType',
            elementName: {
              localPart: 'FloorplanType'
            }
          }, {
            name: 'name',
            required: true,
            elementName: {
              localPart: 'Name'
            }
          }, {
            name: 'comment',
            elementName: {
              localPart: 'Comment'
            }
          }, {
            name: 'unitCount',
            required: true,
            elementName: {
              localPart: 'UnitCount'
            },
            typeInfo: 'Integer'
          }, {
            name: 'floorplanAvailabilityURL',
            elementName: {
              localPart: 'FloorplanAvailabilityURL'
            }
          }, {
            name: 'unitsAvailable',
            elementName: {
              localPart: 'UnitsAvailable'
            },
            typeInfo: 'Integer'
          }, {
            name: 'displayedUnitsAvailable',
            elementName: {
              localPart: 'DisplayedUnitsAvailable'
            },
            typeInfo: 'Integer'
          }, {
            name: 'floorCount',
            elementName: {
              localPart: 'FloorCount'
            },
            typeInfo: 'Integer'
          }, {
            name: 'totalRoomCount',
            elementName: {
              localPart: 'TotalRoomCount'
            },
            typeInfo: 'Integer'
          }, {
            name: 'room',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Room'
            },
            typeInfo: '.RoomType'
          }, {
            name: 'squareFeet',
            required: true,
            elementName: {
              localPart: 'SquareFeet'
            },
            typeInfo: '.PhysicalProperty.Property.Floorplan.SquareFeet'
          }, {
            name: 'marketRent',
            required: true,
            elementName: {
              localPart: 'MarketRent'
            },
            typeInfo: '.PhysicalProperty.Property.Floorplan.MarketRent'
          }, {
            name: 'effectiveRent',
            required: true,
            elementName: {
              localPart: 'EffectiveRent'
            },
            typeInfo: '.PhysicalProperty.Property.Floorplan.EffectiveRent'
          }, {
            name: 'leaseTerm',
            elementName: {
              localPart: 'LeaseTerm'
            },
            typeInfo: '.PhysicalProperty.Property.Floorplan.LeaseTerm'
          }, {
            name: 'concession',
            minOccurs: 0,
            maxOccurs: 10,
            collection: true,
            elementName: {
              localPart: 'Concession'
            },
            typeInfo: '.ConcessionType'
          }, {
            name: 'deposit',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Deposit'
            },
            typeInfo: '.DepositType'
          }, {
            name: 'fee',
            elementName: {
              localPart: 'Fee'
            },
            typeInfo: '.PhysicalProperty.Property.Floorplan.Fee'
          }, {
            name: 'amenity',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Amenity'
            },
            typeInfo: '.SpecificAmenityType'
          }, {
            name: 'file',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'File'
            },
            typeInfo: '.FileType'
          }, {
            name: 'promotional',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Promotional'
            }
          }]
      }, {
        localName: 'NumericRangeType',
        propertyInfos: [{
            name: 'min',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Min'
            },
            type: 'attribute'
          }, {
            name: 'max',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Max'
            },
            type: 'attribute'
          }, {
            name: 'exact',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Exact'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PropertiesType',
        propertyInfos: [{
            name: 'property',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Property'
            },
            typeInfo: '.PropertyType'
          }]
      }, {
        localName: 'Identification',
        propertyInfos: [{
            name: 'idValue',
            required: true,
            attributeName: {
              localPart: 'IDValue'
            },
            type: 'attribute'
          }, {
            name: 'organizationName',
            attributeName: {
              localPart: 'OrganizationName'
            },
            type: 'attribute'
          }, {
            name: 'idType',
            attributeName: {
              localPart: 'IDType'
            },
            type: 'attribute'
          }, {
            name: 'idRank',
            attributeName: {
              localPart: 'IDRank'
            },
            type: 'attribute'
          }, {
            name: 'idScopeType',
            attributeName: {
              localPart: 'IDScopeType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting.CurrentAccountingPeriod',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LeaseType',
        baseTypeInfo: '.Identifiable',
        propertyInfos: [{
            name: 'currentRent',
            elementName: {
              localPart: 'CurrentRent'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'expectedMoveInDate',
            elementName: {
              localPart: 'ExpectedMoveInDate'
            },
            typeInfo: 'Date'
          }, {
            name: 'expectedMoveOutDate',
            elementName: {
              localPart: 'ExpectedMoveOutDate'
            },
            typeInfo: 'Date'
          }, {
            name: 'leaseFromDate',
            elementName: {
              localPart: 'LeaseFromDate'
            },
            typeInfo: 'Date'
          }, {
            name: 'leaseToDate',
            elementName: {
              localPart: 'LeaseToDate'
            },
            typeInfo: 'Date'
          }, {
            name: 'actualMoveIn',
            elementName: {
              localPart: 'ActualMoveIn'
            },
            typeInfo: 'Date'
          }, {
            name: 'actualMoveOut',
            elementName: {
              localPart: 'ActualMoveOut'
            },
            typeInfo: 'Date'
          }, {
            name: 'responsibleForLease',
            elementName: {
              localPart: 'ResponsibleForLease'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'leaseSignDate',
            elementName: {
              localPart: 'LeaseSignDate'
            },
            typeInfo: 'Date'
          }, {
            name: 'specialStatus',
            elementName: {
              localPart: 'SpecialStatus'
            }
          }, {
            name: 'paymentAccepted',
            elementName: {
              localPart: 'PaymentAccepted'
            }
          }, {
            name: 'accountNumber',
            elementName: {
              localPart: 'AccountNumber'
            }
          }, {
            name: 'currentNumberOccupants',
            elementName: {
              localPart: 'CurrentNumberOccupants'
            },
            typeInfo: '.CurrentNumberOccupantsType'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Information',
        typeName: null,
        propertyInfos: [{
            name: 'structureType',
            required: true,
            elementName: {
              localPart: 'StructureType'
            }
          }, {
            name: 'buildingCount',
            elementName: {
              localPart: 'BuildingCount'
            },
            typeInfo: 'Integer'
          }, {
            name: 'unitCount',
            required: true,
            elementName: {
              localPart: 'UnitCount'
            },
            typeInfo: 'Integer'
          }, {
            name: 'numberOfAcres',
            elementName: {
              localPart: 'NumberOfAcres'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'yearBuilt',
            elementName: {
              localPart: 'YearBuilt'
            },
            typeInfo: 'GYear'
          }, {
            name: 'yearRemodeled',
            elementName: {
              localPart: 'YearRemodeled'
            },
            typeInfo: 'GYear'
          }, {
            name: 'acquisitionDate',
            elementName: {
              localPart: 'AcquisitionDate'
            },
            typeInfo: '.PhysicalProperty.Property.Information.AcquisitionDate'
          }, {
            name: 'officeHour',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'OfficeHour'
            },
            typeInfo: '.PhysicalProperty.Property.Information.OfficeHour'
          }, {
            name: 'shortDescription',
            elementName: {
              localPart: 'ShortDescription'
            }
          }, {
            name: 'longDescription',
            elementName: {
              localPart: 'LongDescription'
            }
          }, {
            name: 'leaseLength',
            elementName: {
              localPart: 'LeaseLength'
            }
          }, {
            name: 'rents',
            elementName: {
              localPart: 'Rents'
            },
            typeInfo: '.PhysicalProperty.Property.Information.Rents'
          }, {
            name: 'incomeRentQual',
            minOccurs: 0,
            maxOccurs: 6,
            collection: true,
            elementName: {
              localPart: 'IncomeRentQual'
            },
            typeInfo: '.PhysicalProperty.Property.Information.IncomeRentQual'
          }, {
            name: 'parking',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Parking'
            },
            typeInfo: '.PhysicalProperty.Property.Information.Parking'
          }, {
            name: 'drivingDirections',
            elementName: {
              localPart: 'DrivingDirections'
            }
          }, {
            name: 'services',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Services'
            },
            typeInfo: '.PhysicalProperty.Property.Information.Services'
          }, {
            name: 'propertyAvailabilityURL',
            elementName: {
              localPart: 'PropertyAvailabilityURL'
            }
          }]
      }, {
        localName: 'AddressType',
        propertyInfos: [{
            name: 'description',
            elementName: {
              localPart: 'Description'
            }
          }, {
            name: 'addressLine1',
            elementName: {
              localPart: 'AddressLine1'
            }
          }, {
            name: 'addressLine2',
            elementName: {
              localPart: 'AddressLine2'
            }
          }, {
            name: 'city',
            elementName: {
              localPart: 'City'
            }
          }, {
            name: 'state',
            elementName: {
              localPart: 'State'
            }
          }, {
            name: 'province',
            elementName: {
              localPart: 'Province'
            }
          }, {
            name: 'postalCode',
            elementName: {
              localPart: 'PostalCode'
            }
          }, {
            name: 'country',
            elementName: {
              localPart: 'Country'
            }
          }, {
            name: 'countyName',
            elementName: {
              localPart: 'CountyName'
            }
          }, {
            name: 'unparsedAddress',
            elementName: {
              localPart: 'UnparsedAddress'
            }
          }, {
            name: 'addressType',
            required: true,
            attributeName: {
              localPart: 'AddressType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CompanyContactsType',
        propertyInfos: [{
            name: 'companyContact',
            required: true,
            collection: true,
            elementName: {
              localPart: 'CompanyContact'
            },
            typeInfo: '.CompanyPersonContactType'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting.LastDayBegin',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILSUnit.Affordable',
        typeName: null,
        propertyInfos: [{
            name: 'program',
            required: true,
            elementName: {
              localPart: 'Program'
            }
          }, {
            name: 'contractRent',
            required: true,
            elementName: {
              localPart: 'ContractRent'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'allowance',
            required: true,
            elementName: {
              localPart: 'Allowance'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'affordableType',
            required: true,
            attributeName: {
              localPart: 'AffordableType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'RoomType',
        propertyInfos: [{
            name: 'description',
            elementName: {
              localPart: 'Description'
            }
          }, {
            name: 'count',
            required: true,
            elementName: {
              localPart: 'Count'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'comment',
            required: true,
            elementName: {
              localPart: 'Comment'
            }
          }, {
            name: 'size',
            elementName: {
              localPart: 'Size'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'generalType',
            elementName: {
              localPart: 'GeneralType'
            }
          }, {
            name: 'roomType',
            required: true,
            attributeName: {
              localPart: 'RoomType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Concession',
        typeName: null,
        baseTypeInfo: '.ConcessionType'
      }, {
        localName: 'PropertyTypeExtended',
        baseTypeInfo: '.PropertyType',
        propertyInfos: [{
            name: 'reason',
            required: true,
            elementName: {
              localPart: 'Reason'
            },
            typeInfo: '.PropertyTypeExtended.Reason'
          }, {
            name: 'status',
            attributeName: {
              localPart: 'status'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Floorplan.SquareFeet',
        typeName: null,
        propertyInfos: [{
            name: 'avg',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Avg'
            },
            type: 'attribute'
          }, {
            name: 'min',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Min'
            },
            type: 'attribute'
          }, {
            name: 'max',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Max'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Utility',
        typeName: null,
        propertyInfos: [{
            name: 'airCon',
            required: true,
            elementName: {
              localPart: 'AirCon'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'broadbandInternet',
            required: true,
            elementName: {
              localPart: 'BroadbandInternet'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'cable',
            required: true,
            elementName: {
              localPart: 'Cable'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'electric',
            required: true,
            elementName: {
              localPart: 'Electric'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'gas',
            required: true,
            elementName: {
              localPart: 'Gas'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'heat',
            required: true,
            elementName: {
              localPart: 'Heat'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'hotWater',
            required: true,
            elementName: {
              localPart: 'HotWater'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'satellite',
            required: true,
            elementName: {
              localPart: 'Satellite'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'sewer',
            required: true,
            elementName: {
              localPart: 'Sewer'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'telephone',
            required: true,
            elementName: {
              localPart: 'Telephone'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'trash',
            required: true,
            elementName: {
              localPart: 'Trash'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'water',
            required: true,
            elementName: {
              localPart: 'Water'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'utilityPortionIncluded',
            elementName: {
              localPart: 'UtilityPortionIncluded'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'majorUtility',
            required: true,
            attributeName: {
              localPart: 'MajorUtility'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PropertyDataUploadResponseType',
        propertyInfos: [{
            name: 'property',
            required: true,
            elementName: {
              localPart: 'Property'
            },
            typeInfo: '.PropertyTypeExtended'
          }, {
            name: 'completeDocumentRecieved',
            attributeName: {
              localPart: 'completeDocumentRecieved'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Building',
        typeName: null,
        baseTypeInfo: '.Identification',
        propertyInfos: [{
            name: 'buildingType',
            elementName: {
              localPart: 'BuildingType'
            }
          }, {
            name: 'name',
            required: true,
            elementName: {
              localPart: 'Name'
            }
          }, {
            name: 'description',
            required: true,
            elementName: {
              localPart: 'Description'
            }
          }, {
            name: 'unitCount',
            required: true,
            elementName: {
              localPart: 'UnitCount'
            },
            typeInfo: 'Integer'
          }, {
            name: 'squareFeet',
            required: true,
            elementName: {
              localPart: 'SquareFeet'
            },
            typeInfo: 'Integer'
          }, {
            name: 'amenity',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Amenity'
            },
            typeInfo: '.GeneralAmenityType'
          }, {
            name: 'file',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'File'
            },
            typeInfo: '.FileType'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Information.OfficeHour',
        typeName: null,
        propertyInfos: [{
            name: 'openTime',
            required: true,
            elementName: {
              localPart: 'OpenTime'
            }
          }, {
            name: 'closeTime',
            required: true,
            elementName: {
              localPart: 'CloseTime'
            }
          }, {
            name: 'day',
            required: true,
            elementName: {
              localPart: 'Day'
            }
          }]
      }, {
        localName: 'PhysicalProperty.Property.Information.Parking',
        typeName: null,
        propertyInfos: [{
            name: 'assigned',
            elementName: {
              localPart: 'Assigned'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'assignedFee',
            elementName: {
              localPart: 'AssignedFee'
            }
          }, {
            name: 'spaceFee',
            elementName: {
              localPart: 'SpaceFee'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'spaces',
            elementName: {
              localPart: 'Spaces'
            },
            typeInfo: 'Integer'
          }, {
            name: 'comment',
            elementName: {
              localPart: 'Comment'
            }
          }, {
            name: 'parkingType',
            required: true,
            attributeName: {
              localPart: 'ParkingType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting.AccountsPayable',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting.CurrentAccountingPeriodAR',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Policy.Pet.FeeRange',
        typeName: null,
        propertyInfos: [{
            name: 'min',
            typeInfo: 'Decimal',
            attributeName: {
              localPart: 'Min'
            },
            type: 'attribute'
          }, {
            name: 'max',
            typeInfo: 'Decimal',
            attributeName: {
              localPart: 'Max'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting',
        typeName: null,
        propertyInfos: [{
            name: 'liveDate',
            required: true,
            elementName: {
              localPart: 'LiveDate'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting.LiveDate'
          }, {
            name: 'liveFlag',
            required: true,
            elementName: {
              localPart: 'LiveFlag'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'lastDayBegin',
            required: true,
            elementName: {
              localPart: 'LastDayBegin'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting.LastDayBegin'
          }, {
            name: 'lastDayEnd',
            required: true,
            elementName: {
              localPart: 'LastDayEnd'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting.LastDayEnd'
          }, {
            name: 'lastAccMthEnd',
            required: true,
            elementName: {
              localPart: 'LastAccMthEnd'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting.LastAccMthEnd'
          }, {
            name: 'acctMthEndFlag',
            required: true,
            elementName: {
              localPart: 'AcctMthEndFlag'
            }
          }, {
            name: 'lastInvoiceNumber',
            required: true,
            elementName: {
              localPart: 'LastInvoiceNumber'
            }
          }, {
            name: 'lastReceiptNumber',
            required: true,
            elementName: {
              localPart: 'LastReceiptNumber'
            }
          }, {
            name: 'cashReserve',
            required: true,
            elementName: {
              localPart: 'CashReserve'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'endOfYear',
            required: true,
            elementName: {
              localPart: 'EndOfYear'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting.EndOfYear'
          }, {
            name: 'accountsReceivable',
            required: true,
            elementName: {
              localPart: 'AccountsReceivable'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting.AccountsReceivable'
          }, {
            name: 'accountsPayable',
            required: true,
            elementName: {
              localPart: 'AccountsPayable'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting.AccountsPayable'
          }, {
            name: 'generalLedger',
            required: true,
            elementName: {
              localPart: 'GeneralLedger'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting.GeneralLedger'
          }, {
            name: 'currentAccountingPeriod',
            required: true,
            elementName: {
              localPart: 'CurrentAccountingPeriod'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting.CurrentAccountingPeriod'
          }, {
            name: 'currentAccountingPeriodAR',
            required: true,
            elementName: {
              localPart: 'CurrentAccountingPeriodAR'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting.CurrentAccountingPeriodAR'
          }, {
            name: 'currentAccountingPeriodAP',
            required: true,
            elementName: {
              localPart: 'CurrentAccountingPeriodAP'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting.CurrentAccountingPeriodAP'
          }, {
            name: 'taxCredit',
            required: true,
            elementName: {
              localPart: 'TaxCredit'
            }
          }]
      }, {
        localName: 'FileType',
        propertyInfos: [{
            name: 'fileType',
            required: true,
            elementName: {
              localPart: 'FileType'
            }
          }, {
            name: 'description',
            elementName: {
              localPart: 'Description'
            }
          }, {
            name: 'name',
            required: true,
            elementName: {
              localPart: 'Name'
            }
          }, {
            name: 'caption',
            elementName: {
              localPart: 'Caption'
            }
          }, {
            name: 'format',
            required: true,
            elementName: {
              localPart: 'Format'
            }
          }, {
            name: 'src',
            required: true,
            elementName: {
              localPart: 'Src'
            }
          }, {
            name: 'width',
            elementName: {
              localPart: 'Width'
            },
            typeInfo: 'Integer'
          }, {
            name: 'height',
            elementName: {
              localPart: 'Height'
            },
            typeInfo: 'Integer'
          }, {
            name: 'rank',
            required: true,
            elementName: {
              localPart: 'Rank'
            }
          }, {
            name: 'adID',
            elementName: {
              localPart: 'AdID'
            },
            typeInfo: 'AnyType'
          }, {
            name: 'affiliateID',
            elementName: {
              localPart: 'AffiliateID'
            },
            typeInfo: 'AnyType'
          }, {
            name: 'fileID',
            required: true,
            attributeName: {
              localPart: 'FileID'
            },
            type: 'attribute'
          }, {
            name: 'active',
            required: true,
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'Active'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.PropertyID',
        typeName: null,
        baseTypeInfo: '.PropertyType'
      }, {
        localName: 'PropertyTypeExtended.Reason',
        typeName: null,
        propertyInfos: [{
            name: 'code',
            typeInfo: 'AnySimpleType',
            attributeName: {
              localPart: 'Code'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ContactsType',
        propertyInfos: [{
            name: 'propertyContacts',
            required: true,
            elementName: {
              localPart: 'PropertyContacts'
            },
            typeInfo: '.PropertyContactsType'
          }, {
            name: 'companies',
            required: true,
            elementName: {
              localPart: 'Companies'
            },
            typeInfo: '.CompaniesType'
          }, {
            name: 'persons',
            required: true,
            elementName: {
              localPart: 'Persons'
            },
            typeInfo: '.PersonsType'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Floorplan.EffectiveRent',
        typeName: null,
        propertyInfos: [{
            name: 'avg',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Avg'
            },
            type: 'attribute'
          }, {
            name: 'min',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Min'
            },
            type: 'attribute'
          }, {
            name: 'max',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Max'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PricingType',
        propertyInfos: [{
            name: 'mitsOfferTerm',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'MITS-OfferTerm'
            },
            typeInfo: '.PricingType.MITSOfferTerm'
          }]
      }, {
        localName: 'PhysicalProperty',
        typeName: null,
        propertyInfos: [{
            name: 'management',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Management'
            },
            typeInfo: '.PhysicalProperty.Management'
          }, {
            name: 'property',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Property'
            },
            typeInfo: '.PhysicalProperty.Property'
          }, {
            name: 'propertyDataUploadResponse',
            elementName: {
              localPart: 'PropertyDataUploadResponse'
            },
            typeInfo: '.PropertyDataUploadResponseType'
          }]
      }, {
        localName: 'ConcessionType',
        propertyInfos: [{
            name: 'value',
            elementName: {
              localPart: 'Value'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'term',
            elementName: {
              localPart: 'Term'
            },
            typeInfo: 'Integer'
          }, {
            name: 'dateRange',
            required: true,
            elementName: {
              localPart: 'DateRange'
            },
            typeInfo: '.ConcessionType.DateRange'
          }, {
            name: 'descriptionHeader',
            elementName: {
              localPart: 'DescriptionHeader'
            }
          }, {
            name: 'descriptionBody',
            elementName: {
              localPart: 'DescriptionBody'
            }
          }, {
            name: 'descriptionFooter',
            elementName: {
              localPart: 'DescriptionFooter'
            }
          }, {
            name: 'active',
            required: true,
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'Active'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PricingType.MITSOfferTerm',
        typeName: null,
        baseTypeInfo: '.OfferTermType'
      }, {
        localName: 'PhysicalProperty.Property.ILSUnit.Cancellation',
        typeName: null,
        propertyInfos: [{
            name: 'reason',
            required: true,
            elementName: {
              localPart: 'Reason'
            }
          }]
      }, {
        localName: 'OfferTermType.DateRange.StartDate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SeniorLivingAmenityType',
        propertyInfos: [{
            name: 'description',
            elementName: {
              localPart: 'Description'
            }
          }, {
            name: 'rank',
            elementName: {
              localPart: 'Rank'
            },
            typeInfo: 'Integer'
          }, {
            name: 'amenityType',
            required: true,
            attributeName: {
              localPart: 'AmenityType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Floorplan.MarketRent',
        typeName: null,
        propertyInfos: [{
            name: 'avg',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Avg'
            },
            type: 'attribute'
          }, {
            name: 'min',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Min'
            },
            type: 'attribute'
          }, {
            name: 'max',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Max'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Information.Services',
        typeName: null,
        propertyInfos: [{
            name: 'name',
            required: true,
            elementName: {
              localPart: 'Name'
            }
          }, {
            name: 'detail',
            elementName: {
              localPart: 'Detail'
            }
          }, {
            name: 'distanceTo',
            elementName: {
              localPart: 'DistanceTo'
            }
          }, {
            name: 'comment',
            elementName: {
              localPart: 'Comment'
            }
          }, {
            name: 'nearest',
            required: true,
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'Nearest'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting.EndOfYear',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting.LastDayEnd',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'FeeType',
        propertyInfos: [{
            name: 'prorateType',
            required: true,
            elementName: {
              localPart: 'ProrateType'
            }
          }, {
            name: 'lateType',
            required: true,
            elementName: {
              localPart: 'LateType'
            }
          }, {
            name: 'latePercent',
            required: true,
            elementName: {
              localPart: 'LatePercent'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'lateMinFee',
            required: true,
            elementName: {
              localPart: 'LateMinFee'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'lateFeePerDay',
            required: true,
            elementName: {
              localPart: 'LateFeePerDay'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'nonRefundableHoldFee',
            required: true,
            elementName: {
              localPart: 'NonRefundableHoldFee'
            },
            typeInfo: 'Decimal'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILSUnit.Availability.MadeReadyDate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Policy',
        typeName: null,
        propertyInfos: [{
            name: 'pet',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Pet'
            },
            typeInfo: '.PhysicalProperty.Property.Policy.Pet'
          }, {
            name: 'general',
            elementName: {
              localPart: 'General'
            }
          }]
      }, {
        localName: 'PhysicalProperty.Property.Floorplan.Fee',
        typeName: null,
        baseTypeInfo: '.FeeType',
        propertyInfos: [{
            name: 'adminFee',
            required: true,
            elementName: {
              localPart: 'AdminFee'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'applicationFee',
            required: true,
            elementName: {
              localPart: 'ApplicationFee'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'brokerFee',
            required: true,
            elementName: {
              localPart: 'BrokerFee'
            },
            typeInfo: 'Decimal'
          }]
      }, {
        localName: 'UnitType',
        baseTypeInfo: '.Identifiable',
        propertyInfos: [{
            name: 'marketingName',
            elementName: {
              localPart: 'MarketingName'
            }
          }, {
            name: 'unitType',
            elementName: {
              localPart: 'UnitType'
            }
          }, {
            name: 'unitBedrooms',
            elementName: {
              localPart: 'UnitBedrooms'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'unitBathrooms',
            elementName: {
              localPart: 'UnitBathrooms'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'minSquareFeet',
            elementName: {
              localPart: 'MinSquareFeet'
            },
            typeInfo: 'Integer'
          }, {
            name: 'maxSquareFeet',
            elementName: {
              localPart: 'MaxSquareFeet'
            },
            typeInfo: 'Integer'
          }, {
            name: 'squareFootType',
            elementName: {
              localPart: 'SquareFootType'
            }
          }, {
            name: 'unitRent',
            elementName: {
              localPart: 'UnitRent'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'marketRent',
            elementName: {
              localPart: 'MarketRent'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'unitEconomicStatus',
            elementName: {
              localPart: 'UnitEconomicStatus'
            }
          }, {
            name: 'unitEconomicStatusDescription',
            elementName: {
              localPart: 'UnitEconomicStatusDescription'
            }
          }, {
            name: 'unitOccupancyStatus',
            elementName: {
              localPart: 'UnitOccupancyStatus'
            }
          }, {
            name: 'unitLeasedStatus',
            elementName: {
              localPart: 'UnitLeasedStatus'
            }
          }, {
            name: 'unitLeasedStatusDescription',
            elementName: {
              localPart: 'UnitLeasedStatusDescription'
            }
          }, {
            name: 'numberOccupants',
            elementName: {
              localPart: 'NumberOccupants'
            },
            typeInfo: '.CurrentNumberOccupantsType'
          }, {
            name: 'floorplanName',
            elementName: {
              localPart: 'FloorplanName'
            }
          }, {
            name: 'phaseName',
            elementName: {
              localPart: 'PhaseName'
            }
          }, {
            name: 'buildingName',
            elementName: {
              localPart: 'BuildingName'
            }
          }, {
            name: 'address',
            minOccurs: 0,
            maxOccurs: 10,
            collection: true,
            elementName: {
              localPart: 'Address'
            },
            typeInfo: '.AddressType'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Information.AcquisitionDate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting.GeneralLedger',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DepositType',
        propertyInfos: [{
            name: 'amount',
            elementName: {
              localPart: 'Amount'
            },
            typeInfo: '.DepositType.Amount'
          }, {
            name: 'description',
            elementName: {
              localPart: 'Description'
            }
          }, {
            name: 'percentRefundable',
            elementName: {
              localPart: 'PercentRefundable'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'portionRefundable',
            elementName: {
              localPart: 'PortionRefundable'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'depositType',
            required: true,
            attributeName: {
              localPart: 'DepositType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LeadChannelType.LeadNotification',
        typeName: null,
        propertyInfos: [{
            name: 'value',
            type: 'value'
          }, {
            name: 'notificationType',
            required: true,
            attributeName: {
              localPart: 'NotificationType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILS',
        typeName: null,
        propertyInfos: [{
            name: 'commission',
            required: true,
            elementName: {
              localPart: 'Commission'
            },
            typeInfo: '.PhysicalProperty.Property.ILS.Commission'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting.LiveDate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILSUnit.PaintedDate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PropertyContactsType',
        propertyInfos: [{
            name: 'propertyContact',
            required: true,
            collection: true,
            elementName: {
              localPart: 'PropertyContact'
            },
            typeInfo: '.CompanyContactType'
          }]
      }, {
        localName: 'PetType',
        propertyInfos: [{
            name: 'petType',
            required: true,
            attributeName: {
              localPart: 'PetType'
            },
            type: 'attribute'
          }, {
            name: 'description',
            attributeName: {
              localPart: 'Description'
            },
            type: 'attribute'
          }, {
            name: 'count',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Count'
            },
            type: 'attribute'
          }, {
            name: 'size',
            attributeName: {
              localPart: 'Size'
            },
            type: 'attribute'
          }, {
            name: 'weight',
            attributeName: {
              localPart: 'Weight'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting.AccountsReceivable',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.LeadChannelList',
        typeName: null,
        propertyInfos: [{
            name: 'leadChannel',
            required: true,
            collection: true,
            elementName: {
              localPart: 'LeadChannel'
            },
            typeInfo: '.LeadChannelType'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Policy.Pet',
        typeName: null,
        propertyInfos: [{
            name: 'pets',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Pets'
            },
            typeInfo: '.PhysicalProperty.Property.Policy.Pet.Pets'
          }, {
            name: 'comment',
            elementName: {
              localPart: 'Comment'
            }
          }, {
            name: 'deposit',
            elementName: {
              localPart: 'Deposit'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'fee',
            elementName: {
              localPart: 'Fee'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'rent',
            elementName: {
              localPart: 'Rent'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'feeRange',
            elementName: {
              localPart: 'FeeRange'
            },
            typeInfo: '.PhysicalProperty.Property.Policy.Pet.FeeRange'
          }, {
            name: 'restrictions',
            elementName: {
              localPart: 'Restrictions'
            }
          }, {
            name: 'petCare',
            elementName: {
              localPart: 'PetCare'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'allowed',
            required: true,
            typeInfo: 'Boolean',
            attributeName: {
              localPart: 'Allowed'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting.LastAccMthEnd',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILSUnit.CarpetReplacedDate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILS.Commission.ContractExpire',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILSUnit',
        typeName: null,
        baseTypeInfo: '.Identification',
        propertyInfos: [{
            name: 'units',
            required: true,
            elementName: {
              localPart: 'Units'
            },
            typeInfo: '.UnitsType'
          }, {
            name: 'comment',
            elementName: {
              localPart: 'Comment'
            },
            typeInfo: 'AnyType'
          }, {
            name: 'pricing',
            elementName: {
              localPart: 'Pricing'
            },
            typeInfo: '.PricingType'
          }, {
            name: 'effectiveRent',
            elementName: {
              localPart: 'EffectiveRent'
            },
            typeInfo: '.PhysicalProperty.Property.ILSUnit.EffectiveRent'
          }, {
            name: 'concession',
            minOccurs: 0,
            maxOccurs: 10,
            collection: true,
            elementName: {
              localPart: 'Concession'
            },
            typeInfo: '.ConcessionType'
          }, {
            name: 'deposit',
            elementName: {
              localPart: 'Deposit'
            },
            typeInfo: '.DepositType'
          }, {
            name: 'specialAccess',
            elementName: {
              localPart: 'SpecialAccess'
            }
          }, {
            name: 'entryFloor',
            elementName: {
              localPart: 'EntryFloor'
            }
          }, {
            name: 'priorMarket',
            elementName: {
              localPart: 'PriorMarket'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'changeDate',
            elementName: {
              localPart: 'ChangeDate'
            },
            typeInfo: '.PhysicalProperty.Property.ILSUnit.ChangeDate'
          }, {
            name: 'standardRenewal',
            elementName: {
              localPart: 'StandardRenewal'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'userOption',
            elementName: {
              localPart: 'UserOption'
            }
          }, {
            name: 'profitCenter',
            elementName: {
              localPart: 'ProfitCenter'
            }
          }, {
            name: 'floorLevel',
            elementName: {
              localPart: 'FloorLevel'
            }
          }, {
            name: 'numberOfFloors',
            elementName: {
              localPart: 'NumberOfFloors'
            }
          }, {
            name: 'applianceColorCode',
            elementName: {
              localPart: 'ApplianceColorCode'
            }
          }, {
            name: 'carpetCode',
            elementName: {
              localPart: 'CarpetCode'
            }
          }, {
            name: 'carpetReplacedDate',
            elementName: {
              localPart: 'CarpetReplacedDate'
            },
            typeInfo: '.PhysicalProperty.Property.ILSUnit.CarpetReplacedDate'
          }, {
            name: 'paintedDate',
            elementName: {
              localPart: 'PaintedDate'
            },
            typeInfo: '.PhysicalProperty.Property.ILSUnit.PaintedDate'
          }, {
            name: 'affordable',
            elementName: {
              localPart: 'Affordable'
            },
            typeInfo: '.PhysicalProperty.Property.ILSUnit.Affordable'
          }, {
            name: 'availability',
            elementName: {
              localPart: 'Availability'
            },
            typeInfo: '.PhysicalProperty.Property.ILSUnit.Availability'
          }, {
            name: 'cancellation',
            elementName: {
              localPart: 'Cancellation'
            },
            typeInfo: '.PhysicalProperty.Property.ILSUnit.Cancellation'
          }, {
            name: 'fee',
            elementName: {
              localPart: 'Fee'
            },
            typeInfo: '.FeeType'
          }, {
            name: 'amenity',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Amenity'
            },
            typeInfo: '.SpecificAmenityType'
          }, {
            name: 'file',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'File'
            },
            typeInfo: '.FileType'
          }, {
            name: 'promotional',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Promotional'
            }
          }]
      }, {
        localName: 'PhysicalProperty.Property.Information.Rents',
        typeName: null,
        propertyInfos: [{
            name: 'salePrice',
            elementName: {
              localPart: 'SalePrice'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'startRent',
            elementName: {
              localPart: 'StartRent'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'standardRent',
            elementName: {
              localPart: 'StandardRent'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'corporateRent',
            elementName: {
              localPart: 'CorporateRent'
            },
            typeInfo: '.PhysicalProperty.Property.Information.Rents.CorporateRent'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILSUnit.ChangeDate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Fee',
        typeName: null,
        baseTypeInfo: '.FeeType',
        propertyInfos: [{
            name: 'adminFee',
            required: true,
            elementName: {
              localPart: 'AdminFee'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'applicationFee',
            required: true,
            elementName: {
              localPart: 'ApplicationFee'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'brokerFee',
            required: true,
            elementName: {
              localPart: 'BrokerFee'
            },
            typeInfo: 'Decimal'
          }]
      }, {
        localName: 'ConcessionType.DateRange',
        typeName: null,
        propertyInfos: [{
            name: 'startDate',
            elementName: {
              localPart: 'StartDate'
            },
            typeInfo: '.ConcessionType.DateRange.StartDate'
          }, {
            name: 'endDate',
            elementName: {
              localPart: 'EndDate'
            },
            typeInfo: '.ConcessionType.DateRange.EndDate'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILSUnit.EffectiveRent',
        typeName: null,
        propertyInfos: [{
            name: 'avg',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Avg'
            },
            type: 'attribute'
          }, {
            name: 'min',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Min'
            },
            type: 'attribute'
          }, {
            name: 'max',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Max'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'LeadChannelType',
        baseTypeInfo: '.Identification',
        propertyInfos: [{
            name: 'leadNotification',
            required: true,
            collection: true,
            elementName: {
              localPart: 'LeadNotification'
            },
            typeInfo: '.LeadChannelType.LeadNotification'
          }, {
            name: 'source',
            attributeName: {
              localPart: 'Source'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CompaniesType',
        propertyInfos: [{
            name: 'company',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Company'
            },
            typeInfo: '.CompanyType'
          }]
      }, {
        localName: 'SpecificAmenityType.Rank',
        typeName: null,
        propertyInfos: [{
            name: 'value',
            typeInfo: 'Integer',
            type: 'value'
          }]
      }, {
        localName: 'OfferTermType',
        propertyInfos: [{
            name: 'effectiveRent',
            required: true,
            elementName: {
              localPart: 'EffectiveRent'
            }
          }, {
            name: 'term',
            required: true,
            elementName: {
              localPart: 'Term'
            },
            typeInfo: 'Integer'
          }, {
            name: 'dateRange',
            required: true,
            elementName: {
              localPart: 'DateRange'
            },
            typeInfo: '.OfferTermType.DateRange'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Accounting.CurrentAccountingPeriodAP',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'DepositType.Amount',
        typeName: null,
        propertyInfos: [{
            name: 'valueRange',
            required: true,
            elementName: {
              localPart: 'ValueRange'
            },
            typeInfo: '.CurrencyRangeType'
          }, {
            name: 'amountType',
            required: true,
            attributeName: {
              localPart: 'AmountType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'Identifiable',
        propertyInfos: [{
            name: 'identification',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Identification'
            },
            typeInfo: '.Identification'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Payment',
        typeName: null,
        propertyInfos: [{
            name: 'remitTo',
            required: true,
            elementName: {
              localPart: 'RemitTo'
            }
          }, {
            name: 'checkPayable',
            required: true,
            elementName: {
              localPart: 'CheckPayable'
            }
          }, {
            name: 'method',
            required: true,
            elementName: {
              localPart: 'Method'
            }
          }]
      }, {
        localName: 'ConcessionType.DateRange.StartDate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Information.Rents.CorporateRent',
        typeName: null,
        propertyInfos: [{
            name: 'min',
            typeInfo: 'Decimal',
            attributeName: {
              localPart: 'Min'
            },
            type: 'attribute'
          }, {
            name: 'max',
            typeInfo: 'Decimal',
            attributeName: {
              localPart: 'Max'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'SpecificAmenityType',
        propertyInfos: [{
            name: 'description',
            elementName: {
              localPart: 'Description'
            }
          }, {
            name: 'rank',
            elementName: {
              localPart: 'Rank'
            },
            typeInfo: '.SpecificAmenityType.Rank'
          }, {
            name: 'amenityType',
            required: true,
            attributeName: {
              localPart: 'AmenityType'
            },
            type: 'attribute'
          }, {
            name: 'amenitySubType',
            attributeName: {
              localPart: 'AmenitySubType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILSIdentification',
        typeName: null,
        propertyInfos: [{
            name: 'latitude',
            elementName: {
              localPart: 'Latitude'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'longitude',
            elementName: {
              localPart: 'Longitude'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'daylightSaving',
            elementName: {
              localPart: 'DaylightSaving'
            },
            typeInfo: 'Boolean'
          }, {
            name: 'timeZone',
            elementName: {
              localPart: 'TimeZone'
            }
          }, {
            name: 'lastUpdate',
            elementName: {
              localPart: 'LastUpdate'
            },
            typeInfo: '.PhysicalProperty.Property.ILSIdentification.LastUpdate'
          }, {
            name: 'ilsIdentificationType',
            required: true,
            attributeName: {
              localPart: 'ILS_IdentificationType'
            },
            type: 'attribute'
          }, {
            name: 'rentalType',
            required: true,
            attributeName: {
              localPart: 'RentalType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILS.Commission',
        typeName: null,
        propertyInfos: [{
            name: 'amount',
            required: true,
            elementName: {
              localPart: 'Amount'
            },
            typeInfo: 'Integer'
          }, {
            name: 'minimum',
            required: true,
            elementName: {
              localPart: 'Minimum'
            },
            typeInfo: 'Integer'
          }, {
            name: 'amountPosted',
            required: true,
            elementName: {
              localPart: 'AmountPosted'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'contractExpire',
            required: true,
            elementName: {
              localPart: 'ContractExpire'
            },
            typeInfo: '.PhysicalProperty.Property.ILS.Commission.ContractExpire'
          }, {
            name: 'commissionType',
            required: true,
            attributeName: {
              localPart: 'CommissionType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property',
        typeName: null,
        baseTypeInfo: '.Identification',
        propertyInfos: [{
            name: 'propertyID',
            required: true,
            elementName: {
              localPart: 'PropertyID'
            },
            typeInfo: '.PhysicalProperty.Property.PropertyID'
          }, {
            name: 'generalID',
            minOccurs: 0,
            maxOccurs: 10,
            collection: true,
            elementName: {
              localPart: 'General_ID'
            },
            typeInfo: '.Identification'
          }, {
            name: 'ilsIdentification',
            required: true,
            elementName: {
              localPart: 'ILS_Identification'
            },
            typeInfo: '.PhysicalProperty.Property.ILSIdentification'
          }, {
            name: 'information',
            required: true,
            elementName: {
              localPart: 'Information'
            },
            typeInfo: '.PhysicalProperty.Property.Information'
          }, {
            name: 'accounting',
            elementName: {
              localPart: 'Accounting'
            },
            typeInfo: '.PhysicalProperty.Property.Accounting'
          }, {
            name: 'payment',
            elementName: {
              localPart: 'Payment'
            },
            typeInfo: '.PhysicalProperty.Property.Payment'
          }, {
            name: 'fee',
            elementName: {
              localPart: 'Fee'
            },
            typeInfo: '.PhysicalProperty.Property.Fee'
          }, {
            name: 'concession',
            minOccurs: 0,
            maxOccurs: 10,
            collection: true,
            elementName: {
              localPart: 'Concession'
            },
            typeInfo: '.PhysicalProperty.Property.Concession'
          }, {
            name: 'amenity',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Amenity'
            },
            typeInfo: '.GeneralAmenityType'
          }, {
            name: 'deposit',
            elementName: {
              localPart: 'Deposit'
            },
            typeInfo: '.DepositType'
          }, {
            name: 'policy',
            elementName: {
              localPart: 'Policy'
            },
            typeInfo: '.PhysicalProperty.Property.Policy'
          }, {
            name: 'phase',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Phase'
            },
            typeInfo: '.PhysicalProperty.Property.Phase'
          }, {
            name: 'building',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Building'
            },
            typeInfo: '.PhysicalProperty.Property.Building'
          }, {
            name: 'floorplan',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Floorplan'
            },
            typeInfo: '.PhysicalProperty.Property.Floorplan'
          }, {
            name: 'ilsUnit',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'ILS_Unit'
            },
            typeInfo: '.PhysicalProperty.Property.ILSUnit'
          }, {
            name: 'utility',
            elementName: {
              localPart: 'Utility'
            },
            typeInfo: '.PhysicalProperty.Property.Utility'
          }, {
            name: 'ils',
            elementName: {
              localPart: 'ILS'
            },
            typeInfo: '.PhysicalProperty.Property.ILS'
          }, {
            name: 'file',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'File'
            },
            typeInfo: '.FileType'
          }, {
            name: 'promotional',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Promotional'
            }
          }, {
            name: 'seniorServices',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'SeniorServices'
            },
            typeInfo: '.SeniorLivingAmenityType'
          }, {
            name: 'leadChannelList',
            elementName: {
              localPart: 'LeadChannelList'
            },
            typeInfo: '.PhysicalProperty.Property.LeadChannelList'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Floorplan.LeaseTerm',
        typeName: null,
        propertyInfos: [{
            name: 'avg',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Avg'
            },
            type: 'attribute'
          }, {
            name: 'min',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Min'
            },
            type: 'attribute'
          }, {
            name: 'max',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Max'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CompanyType',
        baseTypeInfo: '.Identifiable',
        propertyInfos: [{
            name: 'companyName',
            required: true,
            elementName: {
              localPart: 'CompanyName'
            }
          }, {
            name: 'address',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Address'
            },
            typeInfo: '.AddressType'
          }, {
            name: 'webSite',
            elementName: {
              localPart: 'WebSite'
            }
          }, {
            name: 'logo',
            elementName: {
              localPart: 'Logo'
            }
          }, {
            name: 'phone',
            minOccurs: 0,
            maxOccurs: 10,
            collection: true,
            elementName: {
              localPart: 'Phone'
            },
            typeInfo: '.PhoneType'
          }, {
            name: 'email',
            elementName: {
              localPart: 'Email'
            }
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILSIdentification.LastUpdate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'GeneralAmenityType',
        propertyInfos: [{
            name: 'description',
            elementName: {
              localPart: 'Description'
            }
          }, {
            name: 'rank',
            elementName: {
              localPart: 'Rank'
            },
            typeInfo: 'Integer'
          }, {
            name: 'amenityType',
            required: true,
            attributeName: {
              localPart: 'AmenityType'
            },
            type: 'attribute'
          }, {
            name: 'amenitySubType',
            attributeName: {
              localPart: 'AmenitySubType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CurrencyRangeType',
        propertyInfos: [{
            name: 'min',
            attributeName: {
              localPart: 'Min'
            },
            type: 'attribute'
          }, {
            name: 'max',
            attributeName: {
              localPart: 'Max'
            },
            type: 'attribute'
          }, {
            name: 'exact',
            attributeName: {
              localPart: 'Exact'
            },
            type: 'attribute'
          }, {
            name: 'currency',
            attributeName: {
              localPart: 'Currency'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'CurrentNumberOccupantsType',
        propertyInfos: [{
            name: 'total',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Total'
            },
            type: 'attribute'
          }, {
            name: 'child',
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Child'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'UnitsType',
        propertyInfos: [{
            name: 'unit',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Unit'
            },
            typeInfo: '.UnitType'
          }]
      }, {
        localName: 'PersonsType',
        propertyInfos: [{
            name: 'person',
            required: true,
            collection: true,
            elementName: {
              localPart: 'Person'
            },
            typeInfo: '.PersonType'
          }]
      }, {
        localName: 'NameType',
        propertyInfos: [{
            name: 'namePrefix',
            elementName: {
              localPart: 'NamePrefix'
            }
          }, {
            name: 'firstName',
            required: true,
            elementName: {
              localPart: 'FirstName'
            }
          }, {
            name: 'middleName',
            elementName: {
              localPart: 'MiddleName'
            }
          }, {
            name: 'lastName',
            required: true,
            elementName: {
              localPart: 'LastName'
            }
          }, {
            name: 'maidenName',
            elementName: {
              localPart: 'MaidenName'
            }
          }, {
            name: 'nameSuffix',
            elementName: {
              localPart: 'NameSuffix'
            }
          }]
      }, {
        localName: 'PhysicalProperty.Management',
        typeName: null,
        baseTypeInfo: '.Identification',
        propertyInfos: [{
            name: 'propertyContacts',
            elementName: {
              localPart: 'PropertyContacts'
            },
            typeInfo: '.PhysicalProperty.Management.PropertyContacts'
          }, {
            name: 'file',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'File'
            },
            typeInfo: '.FileType'
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILSUnit.Availability',
        typeName: null,
        propertyInfos: [{
            name: 'moveOutCode',
            elementName: {
              localPart: 'MoveOutCode'
            }
          }, {
            name: 'moveOutDescription',
            elementName: {
              localPart: 'MoveOutDescription'
            }
          }, {
            name: 'cancellationCode',
            elementName: {
              localPart: 'CancellationCode'
            }
          }, {
            name: 'cancellationDescription',
            elementName: {
              localPart: 'CancellationDescription'
            }
          }, {
            name: 'vacateDate',
            required: true,
            elementName: {
              localPart: 'VacateDate'
            },
            typeInfo: '.PhysicalProperty.Property.ILSUnit.Availability.VacateDate'
          }, {
            name: 'vacancyClass',
            required: true,
            elementName: {
              localPart: 'VacancyClass'
            }
          }, {
            name: 'madeReadyDate',
            required: true,
            elementName: {
              localPart: 'MadeReadyDate'
            },
            typeInfo: '.PhysicalProperty.Property.ILSUnit.Availability.MadeReadyDate'
          }, {
            name: 'unitAvailabilityURL',
            elementName: {
              localPart: 'UnitAvailabilityURL'
            }
          }]
      }, {
        localName: 'PersonType',
        baseTypeInfo: '.Identifiable',
        propertyInfos: [{
            name: 'name',
            required: true,
            elementName: {
              localPart: 'Name'
            },
            typeInfo: '.NameType'
          }, {
            name: 'address',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Address'
            },
            typeInfo: '.AddressType'
          }, {
            name: 'phone',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Phone'
            },
            typeInfo: '.PhoneType'
          }, {
            name: 'email',
            elementName: {
              localPart: 'Email'
            }
          }]
      }, {
        localName: 'OfferTermType.DateRange',
        typeName: null,
        propertyInfos: [{
            name: 'startDate',
            elementName: {
              localPart: 'StartDate'
            },
            typeInfo: '.OfferTermType.DateRange.StartDate'
          }, {
            name: 'endDate',
            elementName: {
              localPart: 'EndDate'
            },
            typeInfo: '.OfferTermType.DateRange.EndDate'
          }]
      }, {
        localName: 'PhoneType',
        propertyInfos: [{
            name: 'phoneDescription',
            elementName: {
              localPart: 'PhoneDescription'
            }
          }, {
            name: 'phoneNumber',
            elementName: {
              localPart: 'PhoneNumber'
            }
          }, {
            name: 'extension',
            elementName: {
              localPart: 'Extension'
            }
          }, {
            name: 'phoneType',
            required: true,
            attributeName: {
              localPart: 'PhoneType'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Information.IncomeRentQual',
        typeName: null,
        propertyInfos: [{
            name: 'incomeLimit',
            elementName: {
              localPart: 'IncomeLimit'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'qualifiedRent',
            elementName: {
              localPart: 'QualifiedRent'
            },
            typeInfo: 'Decimal'
          }, {
            name: 'persons',
            required: true,
            typeInfo: 'Integer',
            attributeName: {
              localPart: 'Persons'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PhysicalProperty.Management.PropertyContacts',
        typeName: null,
        propertyInfos: [{
            name: 'companies',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Companies'
            },
            typeInfo: '.CompanyType'
          }, {
            name: 'persons',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Persons'
            },
            typeInfo: '.PersonType'
          }]
      }, {
        localName: 'PhysicalProperty.Property.Policy.Pet.Pets',
        typeName: null,
        baseTypeInfo: '.PetType'
      }, {
        localName: 'PhysicalProperty.Property.Phase',
        typeName: null,
        baseTypeInfo: '.Identification',
        propertyInfos: [{
            name: 'name',
            required: true,
            elementName: {
              localPart: 'Name'
            }
          }, {
            name: 'description',
            required: true,
            elementName: {
              localPart: 'Description'
            }
          }, {
            name: 'unitCount',
            required: true,
            elementName: {
              localPart: 'UnitCount'
            },
            typeInfo: 'Integer'
          }, {
            name: 'rentableUnits',
            required: true,
            elementName: {
              localPart: 'RentableUnits'
            },
            typeInfo: 'Integer'
          }, {
            name: 'totalSquareFeet',
            required: true,
            elementName: {
              localPart: 'TotalSquareFeet'
            },
            typeInfo: 'Integer'
          }, {
            name: 'rentableSquareFeet',
            required: true,
            elementName: {
              localPart: 'RentableSquareFeet'
            },
            typeInfo: 'Integer'
          }, {
            name: 'amenity',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Amenity'
            },
            typeInfo: '.GeneralAmenityType'
          }, {
            name: 'file',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'File'
            },
            typeInfo: '.FileType'
          }, {
            name: 'promotional',
            minOccurs: 0,
            collection: true,
            elementName: {
              localPart: 'Promotional'
            }
          }]
      }, {
        localName: 'PhysicalProperty.Property.ILSUnit.Availability.VacateDate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'ConcessionType.DateRange.EndDate',
        typeName: null,
        propertyInfos: [{
            name: 'month',
            required: true,
            attributeName: {
              localPart: 'Month'
            },
            type: 'attribute'
          }, {
            name: 'day',
            required: true,
            attributeName: {
              localPart: 'Day'
            },
            type: 'attribute'
          }, {
            name: 'year',
            required: true,
            attributeName: {
              localPart: 'Year'
            },
            type: 'attribute'
          }]
      }, {
        localName: 'PropertyType',
        baseTypeInfo: '.Identifiable',
        propertyInfos: [{
            name: 'marketingName',
            required: true,
            elementName: {
              localPart: 'MarketingName'
            }
          }, {
            name: 'apn',
            elementName: {
              localPart: 'APN'
            }
          }, {
            name: 'legalName',
            elementName: {
              localPart: 'LegalName'
            }
          }, {
            name: 'msaNumber',
            elementName: {
              localPart: 'MSA_Number'
            },
            typeInfo: 'Integer'
          }, {
            name: 'msaName',
            elementName: {
              localPart: 'MSA_Name'
            }
          }, {
            name: 'structureDescription',
            elementName: {
              localPart: 'StructureDescription'
            }
          }, {
            name: 'webSite',
            elementName: {
              localPart: 'WebSite'
            }
          }, {
            name: 'address',
            minOccurs: 0,
            maxOccurs: 10,
            collection: true,
            elementName: {
              localPart: 'Address'
            },
            typeInfo: '.AddressType'
          }, {
            name: 'phone',
            minOccurs: 0,
            maxOccurs: 10,
            collection: true,
            elementName: {
              localPart: 'Phone'
            },
            typeInfo: '.PhoneType'
          }, {
            name: 'email',
            elementName: {
              localPart: 'Email'
            }
          }]
      }, {
        localName: 'CompanyPersonContactType',
        propertyInfos: [{
            name: 'personContactRef',
            required: true,
            elementName: {
              localPart: 'PersonContactRef'
            },
            typeInfo: '.Identifiable'
          }, {
            name: 'personContactRole',
            required: true,
            elementName: {
              localPart: 'PersonContactRole'
            }
          }]
      }, {
        type: 'enumInfo',
        localName: 'PhoneInfo',
        values: ['office', 'cell', 'fax', 'personal', 'home', 'other']
      }, {
        type: 'enumInfo',
        localName: 'AddressInfo',
        values: ['property', 'mailing', 'shipping', 'billing', 'current', 'previous', 'forwarding', 'legal_notice', 'termination_notice', 'other']
      }, {
        type: 'enumInfo',
        localName: 'NotificationType',
        values: ['Email', 'Phone', 'FTP', 'Webservice', 'Chat', 'Text', 'Other']
      }, {
        type: 'enumInfo',
        localName: 'PropertyIDInfo',
        values: ['market rate apt', 'condominium', 'cooperative', 'senior', 'assisted_living', 'subsidized', 'military', 'nursing', 'home', 'student', 'other']
      }, {
        type: 'enumInfo',
        localName: 'IDScopeType',
        values: ['sender', 'recipient', 'thirdparty']
      }, {
        type: 'enumInfo',
        localName: 'UnitOccpStatusInfo',
        values: ['occupied', 'vacant']
      }, {
        type: 'enumInfo',
        localName: 'UnitSqftInfo',
        values: ['internal', 'external']
      }, {
        type: 'enumInfo',
        localName: 'UnitLeaseStatusInfo',
        values: ['leased', 'available', 'approved', 'reserved', 'not_ready', 'on_notice', 'leased_on_notice', 'leased_reserved', 'other']
      }, {
        type: 'enumInfo',
        localName: 'CustomerInfo',
        values: ['guest', 'applicant', 'customer', 'current_resident', 'former_resident', 'future_resident', 'prospect', 'other']
      }, {
        type: 'enumInfo',
        localName: 'IDRank',
        values: ['primary', 'secondary', 'tertiary', 'other']
      }, {
        type: 'enumInfo',
        localName: 'PropertyContactsInfo',
        values: ['manager', 'owner', 'vendor', 'accountant', 'tax_accountant', 'lawyer', 'asset_manager', 'lender', 'investor', 'employer', 'previous_employer', 'bank', 'other']
      }, {
        type: 'enumInfo',
        localName: 'PersonCompanyRoleType',
        values: ['manager', 'owner', 'vendor', 'accountant', 'tax_accountant', 'lawyer', 'asset_manager', 'lender', 'investor', 'other']
      }, {
        type: 'enumInfo',
        localName: 'StatusTypes',
        values: ['Success', 'Failure']
      }, {
        type: 'enumInfo',
        localName: 'UnitEconStatusInfo',
        values: ['residential', 'commercial', 'down', 'model', 'employee', 'construction', 'office', 'other']
      }, {
        type: 'enumInfo',
        localName: 'CompanyRoleType',
        values: ['management_company', 'owner', 'vendor', 'asset_managment', 'lending firm', 'investment_company', 'employer', 'previous_employer', 'bank', 'other']
      }],
    elementInfos: [{
        elementName: {
          localPart: 'PhysicalProperty'
        },
        typeInfo: '.PhysicalProperty'
      }]
  };
  return {
    MITSPropertyMarketing: MITSPropertyMarketing
  };
};
if (typeof define === 'function' && define.amd) {
  define([], MITSPropertyMarketing_Module_Factory);
}
else {
  var MITSPropertyMarketing_Module = MITSPropertyMarketing_Module_Factory();
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.MITSPropertyMarketing = MITSPropertyMarketing_Module.MITSPropertyMarketing;
  }
  else {
    var MITSPropertyMarketing = MITSPropertyMarketing_Module.MITSPropertyMarketing;
  }
}