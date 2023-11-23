import React from 'react';
import numeral from 'numeral';

function Table({ countries, casesType }) {
  return (
    <div className="table">
        {countries.map(( country ) => (
            <tr>
                <td>{country.country}</td>
                <td><strong>{numeral(country[casesType]).format(",0")}</strong></td>                
            </tr>
        ))}
    </div>
  )
}

export default Table