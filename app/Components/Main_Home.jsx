import React from "react";
import Orange_btn from "./Orange_btn.jsx";

const Main_Home = () => {
  return (
    <div className="container Main_Home mt-lg-5">
      <div className="content_wrapper">
        {/* النصوص + أزرار الديسكتوب */}
        <div className="Texts">
          <h2>Web & Mobile Apps, AI Models and Telegram Bots</h2>
          <p className="mt-5">
            تطوير مواقع وتطبيقات موبايل احترافية، مع نماذج ذكاء اصطناعي وبوتات
            تلغرام تدعم نمو أعمالك
          </p>

          {/* أزرار الديسكتوب */}
          <div className="buttons_Orange desktop_buttons mt-5 ">
            <Orange_btn
              text="Start Your Project"
              class="btn_Start"
              href="start"
            />
            <Orange_btn
              text="View Portfolio"
              class={"View_Portfolio"}
              href="portfolio"
            />
          </div>
        </div>

        {/* الصور */}
        <div className="Photos">
          <div>
            <img src="./brain.avif" className="brain" alt="AI Brain"  />
          </div>
          <div>
            <img src="./laptopAi.avif" className="laptopAI" alt="AI Laptop"  />
          </div>
        </div>
      </div>

      {/* أزرار الموبايل */}
      <div className="buttons_Orange mobile_buttons">
        <Orange_btn text="Start Your Project" class="btn_Start" href="start" />

        <Orange_btn
          text="View Portfolio"
          class={"View_Portfolio"}
          href="portfolio"
        />
      </div>
    </div>
  );
};

export default Main_Home;
