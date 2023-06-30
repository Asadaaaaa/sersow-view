import font from "../font.module.css";

export default function TermsConditions() {
  return (
    <div className="flex justify-center text-white">
      <div className="mx-5 sm:mx-12 md:mx-16 lg:mx-36 xl:mx-60 my-6 md:my-10 border-2 border-slate-700 rounded-xl ">
        <div className="px-6 md:px-16 lg:px-24 ">
          <p
            className={`${font.Clash_display_h5medium} mt-6 md:mt-8 lg:mt-12 pb-4 border-b-2 border-slate-700`}
          >
            Terms and Conditions
          </p>

          <div className={`${font.Satoshi_c1medium} text-justify `}>
            <p className="py-4">Last Updated: April 4th 2023</p>
            <p className="text-slate-400 ">
              Welcome to Sersow, a web-based platform for showcasing projects
              created by students and entities affiliated with Universitas
              Pendidikan Indonesia. By accessing and using Sersow, you agree to
              be bound by these terms and conditions, as well as any applicable
              laws and regulations.
            </p>
            <ol className="list-decimal py-4 px-5 text-slate-400">
              <li>
                By using Sersow, you agree to abide by these terms and
                conditions. If you do not agree with any of these terms, please
                do not use the website.
              </li>
              <li>
                The use of the Sersow website is restricted to users with a
                valid email address ending in "@upi.edu".
              </li>
              <li>
                Sersow is an open source and friendly website that allows users
                to showcase their projects and creations. The website is
                provided "as is" without any warranty of any kind, either
                express or implied.
              </li>
              <li>
                All content uploaded to Sersow is the sole responsibility of the
                user who uploaded it. Sersow does not guarantee the accuracy,
                integrity, or quality of any content on the website.
              </li>
              <li>
                Users are solely responsible for the content they upload to
                Sersow, and must ensure that it does not violate any laws or
                infringe on the intellectual property rights of others. Sersow
                reserves the right to remove any content that violates these
                terms and conditions, without notice or explanation.
              </li>
              <li>
                By uploading content to Sersow, users grant Sersow a
                non-exclusive, royalty-free, worldwide license to use, copy,
                modify, distribute, and display the content for the purpose of
                promoting Sersow and its services.
              </li>
              <li>
                Sersow is not responsible for any loss, damage, or injury caused
                by the use of the website, including but not limited to loss of
                data, loss of business, or personal injury.
              </li>
              <li>
                Sersow may modify these terms and conditions at any time,
                without notice or explanation. Users are responsible for
                regularly reviewing these terms and conditions to ensure
                compliance.
              </li>
              <li>
                Sersow may terminate or suspend a user's access to the website
                at any time, without notice or explanation, if the user violates
                these terms and conditions.
              </li>
              <li>
                Users agree to indemnify and hold harmless Sersow, its
                directors, officers, employees, and agents, from and against any
                claims, actions, suits, or proceedings, as well as any and all
                losses, liabilities, damages, costs, and expenses (including
                reasonable attorneys' fees) arising out of or related to their
                use of Sersow.
              </li>
              <li>
                These terms and conditions constitute the entire agreement
                between Sersow and the user, and supersede all prior agreements
                or understandings, whether written or oral, relating to the use
                of the website.
              </li>
            </ol>

            <p className="pb-12 text-slate-400">
              By using the Sersow, users agree to these terms and conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
