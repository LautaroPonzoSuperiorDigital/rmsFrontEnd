import { Navigate, createBrowserRouter } from "react-router-dom";

import TenantChatRoom from "../components/TenantChatRoom";
import TenantsProfile from "../components/TenantsProfile";

import { TenantsLayout } from "../layouts/tenants";

import ContactUs from "../pages/tenants/contact-us";
import CreateRepairTicket from "../pages/tenants/create-repair-ticket";
import Documents from "../pages/tenants/documents";
import createDocumentsLoader from "../pages/tenants/documents/loader";
import CreateComplaintTicket from "../pages/tenants/create-complaint-ticket";
import Payments from "../pages/tenants/payments";
import createPaymentsLoader from "../pages/tenants/payments/loader";
import NewPaymentMethod from "../pages/tenants/payment-methods/new";
import EditPaymentMethod from "../pages/tenants/payment-methods/edit";
import createEditPaymentMethodLoader from "../pages/tenants/payment-methods/edit/loader";
import LatePayments from "../pages/tenants/payments/late";
import createLatePaymentsLoader from "../pages/tenants/payments/late/loader";
import PublicListings from "../components/public/publicListings";
const createTenantsRoutes = (signOut) => [
  {
    path: "contact-us",
    element: <ContactUs />,
  },
  {
    path: "create-repair-ticket",
    element: <CreateRepairTicket />,
  },
  {
    path: "create-complaint-ticket",
    element: <CreateComplaintTicket />,
  },
  {
    path: "documents",
    element: <Documents />,
    loader: createDocumentsLoader(signOut),
  },
  {
    path: "payments",
    children: [
      {
        index: true,
        element: <Payments />,
        loader: createPaymentsLoader(signOut),
      },
      {
        path: "late",
        element: <LatePayments />,
        loader: createLatePaymentsLoader(signOut),
      },
    ],
  },
  {
    path: "payment-methods",
    children: [
      {
        path: "new",
        element: <NewPaymentMethod />,
      },
      {
        path: ":paymentMethodId/edit",
        element: <EditPaymentMethod />,
        loader: createEditPaymentMethodLoader(signOut),
      },
    ],
  },
  {
    path: "profile",
    element: <TenantsProfile />,
  },
  {
    path: "chat",
    element: <TenantChatRoom />,
  },
];

const createApplicantsRoutes = (signOut) => {
  const applicantRoutes = [
    {
      path: "documents",
      element: <Documents />,
      loader: createDocumentsLoader(signOut),
    },
    {
      path: "profile",
      element: <TenantsProfile />,
    },
  ];
  if (window.innerWidth > 900) {
    applicantRoutes.push({
      path: "public-listings",
      element: <PublicListings />,
    });
  }

  return applicantRoutes;
};

export const createTenantsRouter = (user, signOut) => {
  let routes;

  if (user.isApplicant) {
    const applicantsRoutes = createApplicantsRoutes(signOut);

    routes = [
      {
        element: <TenantsLayout />,
        children: applicantsRoutes,
      },
      {
        path: "*",
        element: <Navigate to="/documents" replace />,
      },
    ];
  } else {
    const tenantsRoutes = createTenantsRoutes(signOut);

    routes = [
      {
        element: <TenantsLayout />,
        children: tenantsRoutes,
      },
      {
        path: "*",
        element: <Navigate to="/contact-us" replace />,
      },
    ];
  }

  return createBrowserRouter(routes, { basename: "/tenants" });
};
