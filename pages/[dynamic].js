import Head from "next/head";
import { Router, useRouter } from "next/router";
import React from "react";

const DynamicRoute = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{router.query.dynamic}</title>
      </Head>
      Page {router.query.dynamic}
    </div>
  );
};

export default DynamicRoute;
