import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

export default function LoadingSpinners() {
  return (
    <div>
      <div class="contentWrap">
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <FadeLoader
            color="#395E97"
            height={15}
            width={5}
            radius={2}
            margin={2}
          />
        </div>
      </div>
    </div>
  );
}
