import font from "../font.module.css";

export default function CookiesPolicy() {
  return (
    <div className="flex justify-center text-white">
      <div className="mx-5 sm:mx-12 md:mx-16 lg:mx-36 xl:mx-60 my-6 md:my-10 border-2 border-slate-700 rounded-xl ">
        <div className="px-6 md:px-16 lg:px-24 py-6 md:py-8 lg:py-12 text-justify">
          <p
            className={`${font.Clash_display_h5medium} border-b-2 border-slate-700  pb-4`}
          >
            Cookies policy
          </p>
          <div className={`${font.Satoshi_c1medium} text-slate-400`}>
            <p className="text-white py-4">Last updated: April 4th, 2023 </p>
            <p >
              This Cookies Policy explains what cookies are and how we use them
              on Sersow (the "Site"). Please read this policy carefully to
              understand what cookies are, how we use them, and what your
              options are regarding their use.
            </p>
            <p className={`${font.Satoshi_c1bold} text-white pt-4 pb-1`}>What are cookies?</p>
            <p>
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. They allow the website to
              remember your actions and preferences over time. Cookies are used
              to enhance your user experience, help the website understand how
              it is being used, and provide personalized content and
              advertising.
            </p>
            <p className={`${font.Satoshi_c1bold} text-white pt-4 pb-1`}>How use cookies</p>
            <p>We use cookies on the Site to:</p>
            <ul className="list-disc pl-6">
              <li>Remember your preferences and settings.</li>
              <li>
                Improve your user experience by providing personalized content
                and advertising.
              </li>
              <li>
                Analyze how the Site is being used so we can improve its
                functionality and performance.
              </li>
            </ul>
            <p className={`${font.Satoshi_c1bold} text-white pt-4 pb-1`}>Type of cookies we use</p>
            <p>We use the following types of cookies on this Site:</p>
            <ul className="list-disc pl-6">
              <li>
                Essential cookies: These cookies are necessary for the Site to
                function properly and cannot be switched off in our systems.
                They are usually only set in response to actions made by you
                which amount to a request for services, such as logging in,
                filling in forms, or setting your privacy preferences.
              </li>
              <li>
                Analytics cookies: These cookies allow us to track how users
                interact with the Site so we can improve its functionality and
                performance.
              </li>
              <li>
                Advertising cookies: These cookies are used to personalize ads
                that we show you on the Site and to track the effectiveness of
                those ads.
              </li>
            </ul>
            <p className={`${font.Satoshi_c1bold} text-white pt-4 pb-1`}>Your options</p>
            <p>
              Most web browsers automatically accept cookies, but you can
              usually modify your browser settings to decline cookies if you
              prefer. However, this may prevent you from taking full advantage
              of the Site. If you do not want us to use cookies on the Site, you
              can opt-out by changing your browser setting
            </p>
            <p className={`${font.Satoshi_c1bold} text-white pt-4 pb-1`}>Change to this policy</p>
            <p>
              We may update this Cookies Policy from time to time. We will
              notify you of any changes by posting the new policy on the Site.
              You are advised to review this policy periodically for any
              changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
