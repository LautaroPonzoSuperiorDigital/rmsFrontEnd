export const mockPublicListing = [
  {
    id: 1,
    createdAt: "2023-09-13T17:12:23.576Z",
    updatedAt: "2023-09-13T17:12:23.576Z",
    deletedAt: null,
    location: "1520 Avenida Paulista, 1234, São Paulo, CA",
    street: "Avenida Paulista",
    unitNumber: "1520",
    city: "São Paulo",
    state: "CA",
    zip: "01234",
    lotSize: 13545,
    houseSize: 4354,
    price: 12500,
    bedrooms: 3,
    bathrooms: 2,
    isPublic: true,
    key: null,
    adminId: 2,
    Amenities: [
      {
        name: "Swimming Pool",
      },
      {
        name: "Bar",
      },
      {
        name: "Full Kitchen",
      },
      {
        name: "Air Conditioning",
      },
      {
        name: "Free Parking",
      },
      {
        name: "Pet-Friendly Environment",
      },
    ],
    Requirements: [
      {
        name: "Be Alive",
      },
    ],
    Sections: [
      {
        id: 2,
        name: "Bathroom 1",
        Album: {
          Images: [
            {
              id: 4,
              createdAt: "2023-09-13T17:12:29.066Z",
              updatedAt: "2023-09-13T17:12:29.066Z",
              deletedAt: null,
              key: "listings/1/album/sections/2/images/5388df8e-9342-443f-bc73-1d339a47ef71.jpeg",
              albumSectionId: 2,
            },
          ],
        },
      },
      {
        id: 3,
        name: "Garage",
        Album: {
          Images: [
            {
              id: 5,
              createdAt: "2023-09-13T17:12:30.445Z",
              updatedAt: "2023-09-13T17:12:30.445Z",
              deletedAt: null,
              key: "listings/1/album/sections/3/images/ac6f7bb9-fa7a-4fcd-805c-a70b8ed00675.jpeg",
              albumSectionId: 3,
            },
          ],
        },
      },
      {
        id: 5,
        name: "Living Room",
        Album: null,
      },
      {
        id: 6,
        name: "Kitchen",
        Album: null,
      },
      {
        id: 8,
        name: "Office",
        Album: null,
      },
      {
        id: 7,
        name: "Garage",
        Album: null,
      },
      {
        id: 4,
        name: "Entry",
        Album: null,
      },
      {
        id: 1,
        name: "exterior",
        Album: {
          Images: [
            {
              id: 1,
              createdAt: "2023-09-13T17:12:27.831Z",
              updatedAt: "2023-09-13T17:12:27.831Z",
              deletedAt: null,
              key: "listings/1/album/sections/1/images/46358351-cbbe-4b0b-9eb8-d8f84f45d775.jpeg",
              albumSectionId: 1,
            },
            {
              id: 2,
              createdAt: "2023-09-13T17:12:27.831Z",
              updatedAt: "2023-09-13T17:12:27.831Z",
              deletedAt: null,
              key: "listings/1/album/sections/1/images/15b0e594-d7b0-4c7c-a7c9-cfb3b639f4c6.jpeg",
              albumSectionId: 1,
            },
            {
              id: 3,
              createdAt: "2023-09-13T17:12:27.831Z",
              updatedAt: "2023-09-13T17:12:27.831Z",
              deletedAt: null,
              key: "listings/1/album/sections/1/images/10ddbf8e-1d13-40a6-951c-5509d175ae81.jpeg",
              albumSectionId: 1,
            },
          ],
        },
      },
    ],
    Album: {
      id: 1,
      createdAt: "2023-09-13T17:12:23.576Z",
      updatedAt: "2023-09-13T17:12:23.576Z",
      deletedAt: null,
      listingId: 1,
    },
    Tenants: [
      {
        id: 2,
        createdAt: "2023-09-14T13:08:51.229Z",
        updatedAt: "2023-09-14T13:08:51.229Z",
        deletedAt: null,
        joinDate: "2023-09-14T00:00:00.000Z",
        leaveDate: null,
        tenantId: 2,
        listingId: 1,
        Tenant: {
          id: 2,
          createdAt: "2023-09-14T13:08:19.021Z",
          updatedAt: "2023-09-14T13:08:19.021Z",
          deletedAt: null,
          approvalStatus: "APPROVED",
          phoneNumber: "305-940-1050",
          userId: 7,
        },
      },
    ],
    Expenses: [],
    Inspections: [
      {
        id: 1,
        createdAt: "2023-09-13T17:13:33.006Z",
        updatedAt: "2023-09-13T17:13:33.006Z",
        deletedAt: null,
        name: "Move In Inspection",
        date: "2023-06-14T00:00:00.000Z",
        type: "Shift",
        listingId: 1,
        InspectedSections: [
          {
            id: 1,
            createdAt: "2023-09-13T18:35:13.082Z",
            updatedAt: "2023-09-13T18:35:13.082Z",
            deletedAt: null,
            inspectionId: 1,
            sectionId: 1,
            Categories: [],
          },
          {
            id: 2,
            createdAt: "2023-09-13T18:35:14.313Z",
            updatedAt: "2023-09-13T18:35:14.313Z",
            deletedAt: null,
            inspectionId: 1,
            sectionId: 1,
            Categories: [],
          },
          {
            id: 3,
            createdAt: "2023-09-13T22:01:51.337Z",
            updatedAt: "2023-09-13T22:01:51.337Z",
            deletedAt: null,
            inspectionId: 1,
            sectionId: 1,
            Categories: [],
          },
          {
            id: 4,
            createdAt: "2023-09-14T11:19:04.159Z",
            updatedAt: "2023-09-14T11:19:04.159Z",
            deletedAt: null,
            inspectionId: 1,
            sectionId: 1,
            Categories: [],
          },
          {
            id: 5,
            createdAt: "2023-09-14T21:21:09.815Z",
            updatedAt: "2023-09-14T21:21:09.815Z",
            deletedAt: null,
            inspectionId: 1,
            sectionId: 6,
            Categories: [],
          },
          {
            id: 6,
            createdAt: "2023-09-14T23:07:28.151Z",
            updatedAt: "2023-09-14T23:07:28.151Z",
            deletedAt: null,
            inspectionId: 1,
            sectionId: 1,
            Categories: [],
          },
          {
            id: 11,
            createdAt: "2023-09-15T16:50:18.010Z",
            updatedAt: "2023-09-15T16:50:18.010Z",
            deletedAt: null,
            inspectionId: 1,
            sectionId: 5,
            Categories: [
              {
                id: 11,
                createdAt: "2023-09-15T16:50:18.010Z",
                updatedAt: "2023-09-15T16:50:18.010Z",
                deletedAt: null,
                inspectionSectionId: 11,
                categoryId: 28,
                Images: [
                  {
                    id: 14,
                    createdAt: "2023-09-15T16:50:18.179Z",
                    updatedAt: "2023-09-15T16:50:18.179Z",
                    deletedAt: null,
                    key: "listings/1/inspections/1/sections/5/categories/28/images/c43cf43b-2107-4c9b-afce-e30e3a40fef4.jpeg",
                    inspectionSectionCategoryId: 11,
                  },
                ],
              },
            ],
          },
          {
            id: 12,
            createdAt: "2023-09-15T18:15:33.540Z",
            updatedAt: "2023-09-15T18:15:33.540Z",
            deletedAt: null,
            inspectionId: 1,
            sectionId: 1,
            Categories: [
              {
                id: 12,
                createdAt: "2023-09-15T18:15:33.540Z",
                updatedAt: "2023-09-15T18:15:33.540Z",
                deletedAt: null,
                inspectionSectionId: 12,
                categoryId: 31,
                Images: [
                  {
                    id: 15,
                    createdAt: "2023-09-15T18:15:33.740Z",
                    updatedAt: "2023-09-15T18:15:33.740Z",
                    deletedAt: null,
                    key: "listings/1/inspections/1/sections/1/categories/31/images/d304ee30-629b-40e3-a0b0-0d4fe1d54928.jpeg",
                    inspectionSectionCategoryId: 12,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 2,
        createdAt: "2023-09-13T17:13:54.378Z",
        updatedAt: "2023-09-13T17:13:54.378Z",
        deletedAt: null,
        name: "Regular Inspection",
        date: "2023-09-01T00:00:00.000Z",
        type: "Regular",
        listingId: 1,
        InspectedSections: [
          {
            id: 9,
            createdAt: "2023-09-15T16:34:11.623Z",
            updatedAt: "2023-09-15T16:34:11.623Z",
            deletedAt: null,
            inspectionId: 2,
            sectionId: 8,
            Categories: [],
          },
        ],
      },
      {
        id: 7,
        createdAt: "2023-09-15T22:15:01.738Z",
        updatedAt: "2023-09-15T22:15:01.738Z",
        deletedAt: null,
        name: "Regular Inspection",
        date: "2023-07-30T00:00:00.000Z",
        type: "Regular",
        listingId: 1,
        InspectedSections: [],
      },
      {
        id: 9,
        createdAt: "2023-09-18T15:15:14.342Z",
        updatedAt: "2023-09-18T15:15:14.342Z",
        deletedAt: null,
        name: "Preliminary Inspection",
        date: "2023-09-20T00:00:00.000Z",
        type: "Preliminary",
        listingId: 1,
        InspectedSections: [
          {
            id: 15,
            createdAt: "2023-09-18T15:16:05.465Z",
            updatedAt: "2023-09-18T15:16:05.465Z",
            deletedAt: null,
            inspectionId: 9,
            sectionId: 8,
            Categories: [
              {
                id: 15,
                createdAt: "2023-09-18T15:16:05.465Z",
                updatedAt: "2023-09-18T15:16:05.465Z",
                deletedAt: null,
                inspectionSectionId: 15,
                categoryId: 36,
                Images: [
                  {
                    id: 18,
                    createdAt: "2023-09-18T15:16:15.964Z",
                    updatedAt: "2023-09-18T15:16:15.964Z",
                    deletedAt: null,
                    key: "listings/1/inspections/9/sections/8/categories/36/images/15ea92fc-4f5f-4b3a-bf8c-5e5bc91ec981.png",
                    inspectionSectionCategoryId: 15,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    RepairTickets: [],
    ComplaintTickets: [],
    ChatRooms: [
      {
        id: 2,
        createdAt: "2023-09-14T13:08:51.224Z",
        updatedAt: "2023-09-14T13:08:51.224Z",
        deletedAt: null,
        tenantId: 2,
        listingId: 1,
      },
    ],
    Payments: [],
    ScreeningApplications: [
      {
        id: 2,
        createdAt: "2023-09-14T13:08:20.912Z",
        updatedAt: "2023-09-14T13:08:20.912Z",
        deletedAt: null,
        userId: 7,
        listingId: 1,
        status: "PENDING",
      },
      {
        id: 3,
        createdAt: "2023-09-15T15:28:44.759Z",
        updatedAt: "2023-09-15T15:28:44.759Z",
        deletedAt: null,
        userId: 10,
        listingId: 1,
        status: "PENDING",
      },
    ],
    Admin: {
      id: 2,
      createdAt: "2023-09-13T16:10:42.855Z",
      updatedAt: "2023-09-13T16:10:42.855Z",
      deletedAt: null,
      userId: 2,
    },
  },
  {
    id: 2,
    createdAt: "2023-09-13T18:22:09.536Z",
    updatedAt: "2023-09-13T18:22:09.536Z",
    deletedAt: null,
    location: "123 Larga Ave, 8148, Atascadero, CA",
    street: "Larga Ave",
    unitNumber: "123",
    city: "Atascadero",
    state: "CA",
    zip: "08148",
    lotSize: 14000,
    houseSize: 12000,
    price: 4000,
    bedrooms: 2,
    bathrooms: 1,
    isPublic: false,
    key: null,
    adminId: 3,
    Amenities: [
      {
        name: "Amenity 1",
      },
      {
        name: "Amenity 2",
      },
    ],
    Requirements: [
      {
        name: "Requirement 1",
      },
    ],
    Sections: [
      {
        id: 9,
        name: "exterior",
        Album: {
          Images: [],
        },
      },
    ],
    Album: {
      id: 2,
      createdAt: "2023-09-13T18:22:09.536Z",
      updatedAt: "2023-09-13T18:22:09.536Z",
      deletedAt: null,
      listingId: 2,
    },
    Tenants: [],
    Expenses: [],
    Inspections: [
      {
        id: 5,
        createdAt: "2023-09-15T18:32:08.951Z",
        updatedAt: "2023-09-15T18:32:08.951Z",
        deletedAt: null,
        name: "Regular Inspection",
        date: "2023-09-15T00:00:00.000Z",
        type: "Regular",
        listingId: 2,
        InspectedSections: [],
      },
    ],
    RepairTickets: [],
    ComplaintTickets: [],
    ChatRooms: [],
    Payments: [],
    ScreeningApplications: [],
    Admin: {
      id: 3,
      createdAt: "2023-09-13T18:21:14.673Z",
      updatedAt: "2023-09-13T18:21:14.673Z",
      deletedAt: null,
      userId: 3,
    },
  },
  {
    id: 3,
    createdAt: "2023-09-13T20:15:59.937Z",
    updatedAt: "2023-09-13T20:15:59.937Z",
    deletedAt: null,
    location: "12112 s ortiz, 1312, Buenos Aires, CA",
    street: "s ortiz",
    unitNumber: "12112",
    city: "Buenos Aires",
    state: "CA",
    zip: "01312",
    lotSize: 1000,
    houseSize: 1000,
    price: 1000,
    bedrooms: 1,
    bathrooms: 1,
    isPublic: true,
    key: null,
    adminId: 4,
    Amenities: [
      {
        name: "test",
      },
    ],
    Requirements: [
      {
        name: "test",
      },
    ],
    Sections: [
      {
        id: 10,
        name: "exterior",
        Album: null,
      },
    ],
    Album: {
      id: 3,
      createdAt: "2023-09-13T20:15:59.937Z",
      updatedAt: "2023-09-13T20:15:59.937Z",
      deletedAt: null,
      listingId: 3,
    },
    Tenants: [
      {
        id: 1,
        createdAt: "2023-09-13T20:19:55.489Z",
        updatedAt: "2023-09-13T20:19:55.489Z",
        deletedAt: null,
        joinDate: "2023-09-13T00:00:00.000Z",
        leaveDate: null,
        tenantId: 1,
        listingId: 3,
        Tenant: {
          id: 1,
          createdAt: "2023-09-13T20:17:28.174Z",
          updatedAt: "2023-09-13T20:17:28.174Z",
          deletedAt: null,
          approvalStatus: "APPROVED",
          phoneNumber: "305-940-1050",
          userId: 6,
        },
      },
    ],
    Expenses: [],
    Inspections: [],
    RepairTickets: [],
    ComplaintTickets: [],
    ChatRooms: [
      {
        id: 1,
        createdAt: "2023-09-13T20:19:55.473Z",
        updatedAt: "2023-09-13T20:19:55.473Z",
        deletedAt: null,
        tenantId: 1,
        listingId: 3,
      },
    ],
    Payments: [],
    ScreeningApplications: [
      {
        id: 1,
        createdAt: "2023-09-13T20:17:30.103Z",
        updatedAt: "2023-09-13T20:17:30.103Z",
        deletedAt: null,
        userId: 6,
        listingId: 3,
        status: "PENDING",
      },
    ],
    Admin: {
      id: 4,
      createdAt: "2023-09-13T19:35:14.251Z",
      updatedAt: "2023-09-13T19:35:14.251Z",
      deletedAt: null,
      userId: 4,
    },
  },
  {
    id: 4,
    createdAt: "2023-09-14T12:59:46.697Z",
    updatedAt: "2023-09-14T12:59:46.697Z",
    deletedAt: null,
    location: "123 Larga Ave, 8148, Atascadero, CA",
    street: "Larga Ave",
    unitNumber: "123",
    city: "Atascadero",
    state: "CA",
    zip: "08148",
    lotSize: 13545,
    houseSize: 4354,
    price: 4000,
    bedrooms: 2,
    bathrooms: 2,
    isPublic: false,
    key: null,
    adminId: 3,
    Amenities: [
      {
        name: "amenity 1",
      },
    ],
    Requirements: [
      {
        name: "requirement 1",
      },
    ],
    Sections: [
      {
        id: 11,
        name: "exterior",
        Album: {
          Images: [
            {
              id: 6,
              createdAt: "2023-09-14T12:59:52.263Z",
              updatedAt: "2023-09-14T12:59:52.263Z",
              deletedAt: null,
              key: "listings/4/album/sections/11/images/d910f7e5-0592-4c30-8461-c8a58a228f55.png",
              albumSectionId: 5,
            },
          ],
        },
      },
    ],
    Album: {
      id: 4,
      createdAt: "2023-09-14T12:59:46.697Z",
      updatedAt: "2023-09-14T12:59:46.697Z",
      deletedAt: null,
      listingId: 4,
    },
    Tenants: [],
    Expenses: [],
    Inspections: [
      {
        id: 6,
        createdAt: "2023-09-15T18:32:52.204Z",
        updatedAt: "2023-09-15T18:32:52.204Z",
        deletedAt: null,
        name: "Regular Inspection",
        date: "2023-09-16T00:00:00.000Z",
        type: "Regular",
        listingId: 4,
        InspectedSections: [
          {
            id: 13,
            createdAt: "2023-09-15T18:33:15.785Z",
            updatedAt: "2023-09-15T18:33:15.785Z",
            deletedAt: null,
            inspectionId: 6,
            sectionId: 11,
            Categories: [
              {
                id: 13,
                createdAt: "2023-09-15T18:33:15.785Z",
                updatedAt: "2023-09-15T18:33:15.785Z",
                deletedAt: null,
                inspectionSectionId: 13,
                categoryId: 33,
                Images: [
                  {
                    id: 16,
                    createdAt: "2023-09-15T18:33:15.970Z",
                    updatedAt: "2023-09-15T18:33:15.970Z",
                    deletedAt: null,
                    key: "listings/4/inspections/6/sections/11/categories/33/images/d690d34a-52c2-4679-9a86-6f46b74d7748.png",
                    inspectionSectionCategoryId: 13,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    RepairTickets: [],
    ComplaintTickets: [],
    ChatRooms: [],
    Payments: [],
    ScreeningApplications: [],
    Admin: {
      id: 3,
      createdAt: "2023-09-13T18:21:14.673Z",
      updatedAt: "2023-09-13T18:21:14.673Z",
      deletedAt: null,
      userId: 3,
    },
  },
  {
    id: 5,
    createdAt: "2023-09-15T13:14:11.380Z",
    updatedAt: "2023-09-15T13:14:11.380Z",
    deletedAt: null,
    location: "123 fake street, 123, bs as, CA",
    street: "fake street",
    unitNumber: "123",
    city: "bs as",
    state: "CA",
    zip: "00123",
    lotSize: 1000,
    houseSize: 1000,
    price: 1000,
    bedrooms: 1,
    bathrooms: 1,
    isPublic: true,
    key: null,
    adminId: 5,
    Amenities: [
      {
        name: "test",
      },
    ],
    Requirements: [
      {
        name: "test",
      },
    ],
    Sections: [
      {
        id: 12,
        name: "exterior",
        Album: {
          Images: [],
        },
      },
    ],
    Album: {
      id: 5,
      createdAt: "2023-09-15T13:14:11.380Z",
      updatedAt: "2023-09-15T13:14:11.380Z",
      deletedAt: null,
      listingId: 5,
    },
    Tenants: [],
    Expenses: [],
    Inspections: [],
    RepairTickets: [],
    ComplaintTickets: [],
    ChatRooms: [],
    Payments: [],
    ScreeningApplications: [],
    Admin: {
      id: 5,
      createdAt: "2023-09-14T19:42:20.055Z",
      updatedAt: "2023-09-14T19:42:20.055Z",
      deletedAt: null,
      userId: 9,
    },
  },
  {
    id: 6,
    createdAt: "2023-09-20T23:52:08.953Z",
    updatedAt: "2023-09-20T23:52:08.953Z",
    deletedAt: null,
    location: "8148 Larga Ave, 62884, Atascadero, California",
    street: "Larga Ave",
    unitNumber: "67884",
    city: "Atascadero",
    state: "CA",
    zip: "08148",
    lotSize: 13545,
    houseSize: 4354,
    price: 4000,
    bedrooms: 2,
    bathrooms: 3,
    isPublic: true,
    key: null,
    adminId: 3,
    Amenities: [
      {
        name: "Full Kitchen",
      },
      {
        name: "Air Conditioning",
      },
      {
        name: "Free Parking",
      },
      {
        name: "Pet-Friendly Environment",
      },
    ],
    Requirements: [
      {
        name: "Requirement 1",
      },
      {
        name: "Requirement 2",
      },
      {
        name: "Requirement 3",
      },
    ],
    Sections: [],
    Album: {
      id: 6,
      createdAt: "2023-09-20T23:52:08.953Z",
      updatedAt: "2023-09-20T23:52:08.953Z",
      deletedAt: null,
      listingId: 6,
    },
    Tenants: [],
    Expenses: [],
    Inspections: [],
    RepairTickets: [],
    ComplaintTickets: [],
    ChatRooms: [],
    Payments: [],
    ScreeningApplications: [],
    Admin: {
      id: 3,
      createdAt: "2023-09-13T18:21:14.673Z",
      updatedAt: "2023-09-13T18:21:14.673Z",
      deletedAt: null,
      userId: 3,
    },
  },
];

export const mockSingleListing = {
  id: 1,
  createdAt: "2023-09-13T17:12:23.576Z",
  updatedAt: "2023-09-13T17:12:23.576Z",
  deletedAt: null,
  location: "1520 Avenida Paulista, 1234, São Paulo, CA",
  street: "Avenida Paulista",
  unitNumber: "1520",
  city: "São Paulo",
  state: "CA",
  zip: "01234",
  lotSize: 13545,
  houseSize: 4354,
  price: 12500,
  bedrooms: 3,
  bathrooms: 2,
  isPublic: true,
  key: null,
  adminId: 2,
  Amenities: [
    {
      name: "Swimming Pool",
    },
    {
      name: "Bar",
    },
    {
      name: "Full Kitchen",
    },
    {
      name: "Air Conditioning",
    },
    {
      name: "Free Parking",
    },
    {
      name: "Pet-Friendly Environment",
    },
  ],
  Requirements: [
    {
      name: "Be Alive",
    },
  ],
  Sections: [
    {
      id: 2,
      name: "Bathroom 1",
      Album: {
        Images: [
          {
            id: 4,
            createdAt: "2023-09-13T17:12:29.066Z",
            updatedAt: "2023-09-13T17:12:29.066Z",
            deletedAt: null,
            key: "listings/1/album/sections/2/images/5388df8e-9342-443f-bc73-1d339a47ef71.jpeg",
            albumSectionId: 2,
          },
        ],
      },
    },
    {
      id: 3,
      name: "Garage",
      Album: {
        Images: [
          {
            id: 5,
            createdAt: "2023-09-13T17:12:30.445Z",
            updatedAt: "2023-09-13T17:12:30.445Z",
            deletedAt: null,
            key: "listings/1/album/sections/3/images/ac6f7bb9-fa7a-4fcd-805c-a70b8ed00675.jpeg",
            albumSectionId: 3,
          },
        ],
      },
    },
    {
      id: 5,
      name: "Living Room",
      Album: null,
    },
    {
      id: 6,
      name: "Kitchen",
      Album: null,
    },
    {
      id: 8,
      name: "Office",
      Album: null,
    },
    {
      id: 7,
      name: "Garage",
      Album: null,
    },
    {
      id: 4,
      name: "Entry",
      Album: null,
    },
    {
      id: 1,
      name: "exterior",
      Album: {
        Images: [
          {
            id: 1,
            createdAt: "2023-09-13T17:12:27.831Z",
            updatedAt: "2023-09-13T17:12:27.831Z",
            deletedAt: null,
            key: "listings/1/album/sections/1/images/46358351-cbbe-4b0b-9eb8-d8f84f45d775.jpeg",
            albumSectionId: 1,
          },
          {
            id: 2,
            createdAt: "2023-09-13T17:12:27.831Z",
            updatedAt: "2023-09-13T17:12:27.831Z",
            deletedAt: null,
            key: "listings/1/album/sections/1/images/15b0e594-d7b0-4c7c-a7c9-cfb3b639f4c6.jpeg",
            albumSectionId: 1,
          },
          {
            id: 3,
            createdAt: "2023-09-13T17:12:27.831Z",
            updatedAt: "2023-09-13T17:12:27.831Z",
            deletedAt: null,
            key: "listings/1/album/sections/1/images/10ddbf8e-1d13-40a6-951c-5509d175ae81.jpeg",
            albumSectionId: 1,
          },
        ],
      },
    },
  ],
  Album: {
    id: 1,
    createdAt: "2023-09-13T17:12:23.576Z",
    updatedAt: "2023-09-13T17:12:23.576Z",
    deletedAt: null,
    listingId: 1,
  },
  Tenants: [
    {
      id: 2,
      createdAt: "2023-09-14T13:08:51.229Z",
      updatedAt: "2023-09-14T13:08:51.229Z",
      deletedAt: null,
      joinDate: "2023-09-14T00:00:00.000Z",
      leaveDate: null,
      tenantId: 2,
      listingId: 1,
      Tenant: {
        id: 2,
        createdAt: "2023-09-14T13:08:19.021Z",
        updatedAt: "2023-09-14T13:08:19.021Z",
        deletedAt: null,
        approvalStatus: "APPROVED",
        phoneNumber: "305-940-1050",
        userId: 7,
      },
    },
  ],
  Expenses: [],
  Inspections: [
    {
      id: 1,
      createdAt: "2023-09-13T17:13:33.006Z",
      updatedAt: "2023-09-13T17:13:33.006Z",
      deletedAt: null,
      name: "Move In Inspection",
      date: "2023-06-14T00:00:00.000Z",
      type: "Shift",
      listingId: 1,
      InspectedSections: [
        {
          id: 1,
          createdAt: "2023-09-13T18:35:13.082Z",
          updatedAt: "2023-09-13T18:35:13.082Z",
          deletedAt: null,
          inspectionId: 1,
          sectionId: 1,
          Categories: [],
        },
        {
          id: 2,
          createdAt: "2023-09-13T18:35:14.313Z",
          updatedAt: "2023-09-13T18:35:14.313Z",
          deletedAt: null,
          inspectionId: 1,
          sectionId: 1,
          Categories: [],
        },
        {
          id: 3,
          createdAt: "2023-09-13T22:01:51.337Z",
          updatedAt: "2023-09-13T22:01:51.337Z",
          deletedAt: null,
          inspectionId: 1,
          sectionId: 1,
          Categories: [],
        },
        {
          id: 4,
          createdAt: "2023-09-14T11:19:04.159Z",
          updatedAt: "2023-09-14T11:19:04.159Z",
          deletedAt: null,
          inspectionId: 1,
          sectionId: 1,
          Categories: [],
        },
        {
          id: 5,
          createdAt: "2023-09-14T21:21:09.815Z",
          updatedAt: "2023-09-14T21:21:09.815Z",
          deletedAt: null,
          inspectionId: 1,
          sectionId: 6,
          Categories: [],
        },
        {
          id: 6,
          createdAt: "2023-09-14T23:07:28.151Z",
          updatedAt: "2023-09-14T23:07:28.151Z",
          deletedAt: null,
          inspectionId: 1,
          sectionId: 1,
          Categories: [],
        },
        {
          id: 11,
          createdAt: "2023-09-15T16:50:18.010Z",
          updatedAt: "2023-09-15T16:50:18.010Z",
          deletedAt: null,
          inspectionId: 1,
          sectionId: 5,
          Categories: [
            {
              id: 11,
              createdAt: "2023-09-15T16:50:18.010Z",
              updatedAt: "2023-09-15T16:50:18.010Z",
              deletedAt: null,
              inspectionSectionId: 11,
              categoryId: 28,
              Images: [
                {
                  id: 14,
                  createdAt: "2023-09-15T16:50:18.179Z",
                  updatedAt: "2023-09-15T16:50:18.179Z",
                  deletedAt: null,
                  key: "listings/1/inspections/1/sections/5/categories/28/images/c43cf43b-2107-4c9b-afce-e30e3a40fef4.jpeg",
                  inspectionSectionCategoryId: 11,
                },
              ],
            },
          ],
        },
        {
          id: 12,
          createdAt: "2023-09-15T18:15:33.540Z",
          updatedAt: "2023-09-15T18:15:33.540Z",
          deletedAt: null,
          inspectionId: 1,
          sectionId: 1,
          Categories: [
            {
              id: 12,
              createdAt: "2023-09-15T18:15:33.540Z",
              updatedAt: "2023-09-15T18:15:33.540Z",
              deletedAt: null,
              inspectionSectionId: 12,
              categoryId: 31,
              Images: [
                {
                  id: 15,
                  createdAt: "2023-09-15T18:15:33.740Z",
                  updatedAt: "2023-09-15T18:15:33.740Z",
                  deletedAt: null,
                  key: "listings/1/inspections/1/sections/1/categories/31/images/d304ee30-629b-40e3-a0b0-0d4fe1d54928.jpeg",
                  inspectionSectionCategoryId: 12,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      createdAt: "2023-09-13T17:13:54.378Z",
      updatedAt: "2023-09-13T17:13:54.378Z",
      deletedAt: null,
      name: "Regular Inspection",
      date: "2023-09-01T00:00:00.000Z",
      type: "Regular",
      listingId: 1,
      InspectedSections: [
        {
          id: 9,
          createdAt: "2023-09-15T16:34:11.623Z",
          updatedAt: "2023-09-15T16:34:11.623Z",
          deletedAt: null,
          inspectionId: 2,
          sectionId: 8,
          Categories: [],
        },
      ],
    },
    {
      id: 7,
      createdAt: "2023-09-15T22:15:01.738Z",
      updatedAt: "2023-09-15T22:15:01.738Z",
      deletedAt: null,
      name: "Regular Inspection",
      date: "2023-07-30T00:00:00.000Z",
      type: "Regular",
      listingId: 1,
      InspectedSections: [],
    },
    {
      id: 9,
      createdAt: "2023-09-18T15:15:14.342Z",
      updatedAt: "2023-09-18T15:15:14.342Z",
      deletedAt: null,
      name: "Preliminary Inspection",
      date: "2023-09-20T00:00:00.000Z",
      type: "Preliminary",
      listingId: 1,
      InspectedSections: [
        {
          id: 15,
          createdAt: "2023-09-18T15:16:05.465Z",
          updatedAt: "2023-09-18T15:16:05.465Z",
          deletedAt: null,
          inspectionId: 9,
          sectionId: 8,
          Categories: [
            {
              id: 15,
              createdAt: "2023-09-18T15:16:05.465Z",
              updatedAt: "2023-09-18T15:16:05.465Z",
              deletedAt: null,
              inspectionSectionId: 15,
              categoryId: 36,
              Images: [
                {
                  id: 18,
                  createdAt: "2023-09-18T15:16:15.964Z",
                  updatedAt: "2023-09-18T15:16:15.964Z",
                  deletedAt: null,
                  key: "listings/1/inspections/9/sections/8/categories/36/images/15ea92fc-4f5f-4b3a-bf8c-5e5bc91ec981.png",
                  inspectionSectionCategoryId: 15,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  RepairTickets: [],
  ComplaintTickets: [],
  ChatRooms: [
    {
      id: 2,
      createdAt: "2023-09-14T13:08:51.224Z",
      updatedAt: "2023-09-14T13:08:51.224Z",
      deletedAt: null,
      tenantId: 2,
      listingId: 1,
    },
  ],
  Payments: [],
  ScreeningApplications: [
    {
      id: 2,
      createdAt: "2023-09-14T13:08:20.912Z",
      updatedAt: "2023-09-14T13:08:20.912Z",
      deletedAt: null,
      userId: 7,
      listingId: 1,
      status: "PENDING",
    },
    {
      id: 3,
      createdAt: "2023-09-15T15:28:44.759Z",
      updatedAt: "2023-09-15T15:28:44.759Z",
      deletedAt: null,
      userId: 10,
      listingId: 1,
      status: "PENDING",
    },
  ],
  Admin: {
    id: 2,
    createdAt: "2023-09-13T16:10:42.855Z",
    updatedAt: "2023-09-13T16:10:42.855Z",
    deletedAt: null,
    userId: 2,
  },
};
