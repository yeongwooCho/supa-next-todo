"use client";

import React from 'react';
import {pingAction} from "@/actions/ping/ping.action";

const ClientComponentTest = () => {
  return (
    <div>

      <button onClick={async () => {
        const result = await pingAction();
        console.log(result);
      }}>Test
      </button>
    </div>
  );
};

export default ClientComponentTest;
