import React, { FC } from "react";
import "../styles/Footer.css";

interface IFooterProps {
  filterStatus: string;
  setFilterStatus: (status: string) => void;
  itemLeft: number;
  canRender: boolean;
}

const Footer: FC<IFooterProps> = ({
  filterStatus,
  setFilterStatus,
  itemLeft,
  canRender,
}) => {
  return (
    <>
      {canRender && (
        <div className="d-flex footer">
          <div className="d-flex align-center">
            {itemLeft} items left
          </div>
          <div className="d-flex align-center filter-button-container">
            <button
              className={`filter-button d-flex align-center
          ${filterStatus === "All" && "button-activate"} `}
              onClick={() => {
                setFilterStatus("All");
              }}
            >
              All
            </button>
            <button
              className={`filter-button d-flex align-center
        ${filterStatus === "Activated" && "button-activate"}
        `}
              onClick={() => {
                setFilterStatus("Activated");
              }}
            >
              Activated
            </button>
            <button
              className={`filter-button d-flex align-center
          ${filterStatus === "Completed" && "button-activate"} `}
              onClick={() => {
                setFilterStatus("Completed");
              }}
            >
              Completed
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Footer;
