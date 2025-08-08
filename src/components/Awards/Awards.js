/** @format */
import { award2, galleryImg1, galleryImg4, award4, award5 } from "../../assest";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const Awards = () => {
  return (
    <section className="awards-ambassadors MaxComponent">
      <h5 className="heading">Awards & Ambassadorships</h5>

      <div className="container">
        <div className="scrolling-text1">
          <div className="item">
            <ImageLazyLoading
              img={award5}
              alt={"Best In Business 2025"}
              className="thumbnail"
            />
            <div>
              <p className="title">
                BEST IN Business <br /> 2025
              </p>
            </div>
          </div>
          <div className="item">
            <ImageLazyLoading
              img={award2}
              alt={"Best In Business 2024"}
              className="thumbnail"
            />
            <div>
              <p className="title">
                BEST IN Business <br /> 2024
              </p>
            </div>
          </div>
          <div className="item">
            <ImageLazyLoading
              img={award4}
              alt={"People’s choice"}
              className="thumbnail"
            />
            <div>
              <p className="title">
                People’s choice <br />
                2024 Winner{" "}
              </p>
            </div>
          </div>
          <div className="item">
            <ImageLazyLoading
              img={galleryImg1}
              alt={"Aerolase Ambassador"}
              className="thumbnail"
            />
            <div>
              <p className="title">
                Aerolase <br /> Ambassador
              </p>
            </div>
          </div>
          <div className="item">
            <ImageLazyLoading
              img={galleryImg4}
              alt={"Hydrafacial Master Hydrafacialist"}
              className="thumbnail"
            />
            <div>
              <p className="title">
                Hydrafacial <br /> Master Hydrafacialist
              </p>
            </div>
          </div>

          <div className="item">
            <ImageLazyLoading
              img={award5}
              alt={"Best In Business 2025"}
              className="thumbnail"
            />
            <div>
              <p className="title">
                BEST IN Business <br /> 2025
              </p>
            </div>
          </div>
          <div className="item">
            <ImageLazyLoading
              img={award2}
              alt={"Best In Business 2024"}
              className="thumbnail"
            />
            <div>
              <p className="title">
                BEST IN Business <br /> 2024
              </p>
            </div>
          </div>
          <div className="item">
            <ImageLazyLoading
              img={award4}
              alt={"People’s choice"}
              className="thumbnail"
            />
            <div>
              <p className="title">
                People’s choice <br />
                2024 Winner{" "}
              </p>
            </div>
          </div>
          <div className="item">
            <ImageLazyLoading
              img={galleryImg1}
              alt={"Aerolase Ambassador"}
              className="thumbnail"
            />
            <div>
              <p className="title">
                Aerolase <br /> Ambassador
              </p>
            </div>
          </div>
          <div className="item">
            <ImageLazyLoading
              img={galleryImg4}
              alt={"Hydrafacial Master Hydrafacialist"}
              className="thumbnail"
            />
            <div>
              <p className="title">
                Hydrafacial <br /> Master Hydrafacialist
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container11">
        <div className="item">
          <ImageLazyLoading
            img={award5}
            alt={"Best In Business 2025"}
            className="thumbnail"
          />
          <div>
            <p className="title">
              BEST IN Business <br /> 2025
            </p>
          </div>
        </div>
        <div className="item">
          <ImageLazyLoading
            img={award2}
            alt={"Best In Business 2024"}
            className="thumbnail"
          />
          <div>
            <p className="title">
              BEST IN Business <br /> 2024
            </p>
          </div>
        </div>
        <div className="item">
          <ImageLazyLoading
            img={award4}
            alt={"People’s choice"}
            className="thumbnail"
          />
          <div>
            <p className="title">
              People’s choice <br />
              2024 Winner{" "}
            </p>
          </div>
        </div>
        <div className="item">
          <ImageLazyLoading
            img={galleryImg1}
            alt={"Aerolase Ambassador"}
            className="thumbnail"
          />
          <div>
            <p className="title">
              Aerolase <br /> Ambassador
            </p>
          </div>
        </div>
        <div className="item">
          <ImageLazyLoading
            img={galleryImg4}
            alt={"Hydrafacial Master Hydrafacialist"}
            className="thumbnail"
          />
          <div>
            <p className="title">
              Hydrafacial <br /> Master  Hydrafacialist
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
