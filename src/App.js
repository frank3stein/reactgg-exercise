import * as React from "react";
import { calculatePrime, translations, formatNumberToString } from "./utils";

export default function LocalizedPrimeNumbers() {
  const count = 1;
  const locale = "en-US";

  const handleClick = () => {};
  const handleLocaleChange = () => {};

  const nthprime = calculatePrime(count);

  return (
    <div>
      <header>
        <select value={locale} onChange={handleLocaleChange}>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español (ES)</option>
        </select>

        <button className="primary" onClick={handleClick}>
          {translations[locale].nextPrime}
        </button>
      </header>
      <p>
        {translations[locale].nthPrime(
          formatNumberToString(count, locale),
          nthprime
        )}
      </p>
    </div>
  );
}
