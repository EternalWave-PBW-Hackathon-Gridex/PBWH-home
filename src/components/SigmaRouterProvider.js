import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import Layout from "./Layout";
import Lockdrop from "../pages/Lockdrop";
// import Mint from "../pages/Mint";
import Convert from "../pages/Convert";
// import Farm from "../pages/Farm";
// import Vote from "../pages/Vote";
// import Govern from "../pages/Govern";
// import VoteConnector from "../context/Vote/VoteConnector";
import TokenPriceConnector from "../context/TokenPriceConnector";

const SigmaRouterProvider = (props) => {
  const router = createBrowserRouter([
    {
      element: (
        <TokenPriceConnector.Provider>
          <Layout />
        </TokenPriceConnector.Provider>
      ),
      children: [
        {
          path: "/",
          element: <Convert />
          // element: <Navigate to="mint" replace />
        },
        {
          path: "/lockdrop",
          element: <Lockdrop />
        }
        // {
        //   path: "/mint",
        //   element: <Mint />
        // },
        // {
        //   path: "/farm",
        //   element: <Farm />
        // },
        // {
        //   path: "/vote/:voteContent",
        //   element: (
        //     <VoteConnector.Provider>
        //       <Vote />
        //     </VoteConnector.Provider>
        //   )
        // },
        // {
        //   path: "/govern",
        //   element: <Govern />
        // }
      ]
    }

    // {
    //   path: "*",
    //   element: <NotFound />
    // }
  ]);

  return <RouterProvider router={router} />;
};

export default SigmaRouterProvider;
