"use client";

import { useState } from "react";
import { Bot, FilePenLine, Info } from "lucide-react";

type Method = "manual" | "automatic";

export default function ChooseMethod() {
  const [selectedMethod, setSelectedMethod] =
    useState<Method>("manual");

  return (
    <section className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Choose Method
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          How would you like to create this tracker?
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">

        <button
          type="button"
          onClick={() => setSelectedMethod("manual")}
          className={`rounded-xl border-2 p-6 text-left transition ${
            selectedMethod === "manual"
              ? "border-violet-500 bg-violet-50"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <FilePenLine
            size={32}
            className="text-violet-600"
          />

          <h3 className="mt-5 font-semibold text-slate-900">
            Manual
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Enter opportunity details manually.
          </p>
        </button>


        <button
          type="button"
          onClick={() => setSelectedMethod("automatic")}
          className={`rounded-xl border-2 p-6 text-left transition ${
            selectedMethod === "automatic"
              ? "border-violet-500 bg-violet-50"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <Bot
            size={32}
            className="text-violet-600"
          />

          <h3 className="mt-5 font-semibold text-slate-900">
            Automatic
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Let AI extract opportunity details from a URL.
          </p>
        </button>

      </div>


      <div className="mt-6 flex items-start gap-2 rounded-lg border border-blue-100 bg-blue-50 p-3">
        <Info
          size={17}
          className="mt-0.5 text-blue-600"
        />

        <p className="text-sm text-blue-700">
          {selectedMethod === "manual"
            ? "Manual entry gives you full control and accuracy."
            : "Automatic entry will analyze an opportunity URL and extract available details."}
        </p>
      </div>


      <div className="mt-8 flex justify-end gap-3">

        <button
          type="button"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          className="rounded-lg bg-violet-600 px-5 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          Continue
        </button>

      </div>

    </section>
  );
}