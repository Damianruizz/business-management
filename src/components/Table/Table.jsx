import React from "react";
import { shape, arrayOf, string } from "prop-types";
import { useTranslation } from "react-i18next";
import styles from "./Table.module.css";
import classNames from "classnames";

const Table = ({ headers, data, className }) => {
  const { t } = useTranslation();
  return (
    <table className={classNames(styles.layout, className)}>
      <tbody>
        <tr>
          {headers?.map(head => (
            <th key={head}>{t(head)}</th>
          ))}
        </tr>
        {data?.map((element, index) => (
          <tr key={element.id || index}>
            <td>{element.name}</td>
            <td className={styles.actions}>
              {element?.actions?.map((action, index) => (
                <button
                  key={action.name || index}
                  onClick={() => action.action(element)}
                >
                  {t(action.name)}
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  headers: arrayOf(string),
  data: arrayOf(shape({})),
};

Table.defaultProps = {
  headers: [],
  data: [],
};

export default Table;
