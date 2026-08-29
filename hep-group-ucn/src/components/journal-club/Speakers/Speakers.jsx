"use client";

import styles from "./Speakers.module.css";
import Container from "@/components/layout/Container";

import {
  useLocale,
  useTranslations,
} from "next-intl";

import Image from "next/image";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const FALLBACK_PHOTO = "/brand/logoucn.png";

const DEFAULT_UPCOMING = {
  name: "Main topic",
  title: "Upcoming Talk Title",
  date: "To be announced",
  place: "UCN Physics Department, Room 505",
  activity: "Journal Club Session",
  speaker: "Group Members",
  description:
    "The group members will present and discuss a recent research paper related to our field. The session will include a presentation by the speaker, followed by an open discussion among attendees. This is a great opportunity to stay updated on the latest developments.",
  imageUrl: FALLBACK_PHOTO,
};

function formatDate(dateString, locale = "en") {
  if (!dateString) {
    return "";
  }

  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  if (!year || !month || !day) {
    return dateString;
  }

  const date = new Date(
    Date.UTC(year, month - 1, day)
  );

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function groupTalksByYear(talks) {
  const groups = {};

  talks.forEach((talk) => {
    if (!talk.date) {
      return;
    }

    const year = talk.date.slice(0, 4);

    if (!groups[year]) {
      groups[year] = [];
    }

    groups[year].push(talk);
  });

  Object.values(groups).forEach((yearTalks) => {
    yearTalks.sort((a, b) =>
      b.date.localeCompare(a.date)
    );
  });

  return Object.entries(groups).sort(
    ([yearA], [yearB]) =>
      Number(yearB) - Number(yearA)
  );
}

export default function Speakers({
  talks = [],
  sanityError = false,
}) {
  const t = useTranslations("Speakers");
  const locale = useLocale();

  const [selectedTalk, setSelectedTalk] =
    useState(null);

  const scrollerRefs = useRef({});

  const calendarUrl =
    "https://calendar.google.com/calendar/embed?src=89eb9d7b3f7923f0e11df75bf6f529a1fc80c84a1517e3e091b67c1b32391c33%40group.calendar.google.com&ctz=America%2FBogota";

  // ---------------------------------------------------------
  // UPCOMING TALK
  // ---------------------------------------------------------

  const upcomingTalk =
    talks.find(
      (talk) => talk.isUpcoming === true
    ) ?? null;

  const upcoming = upcomingTalk
    ? {
        name:
          upcomingTalk.mainTopic ||
          "Main topic",

        title:
          upcomingTalk.title ||
          "Upcoming Talk Title",

        date:
          formatDate(
            upcomingTalk.date,
            locale
          ) || "To be announced",

        place:
          upcomingTalk.location ||
          "To be announced",

        activity: "Journal Club Session",

        speaker:
          upcomingTalk.speaker ||
          "To be announced",

        description:
          upcomingTalk.abstract ||
          "To be announced.",

        imageUrl:
          upcomingTalk.posterUrl ||
          FALLBACK_PHOTO,
      }
    : DEFAULT_UPCOMING;

  // ---------------------------------------------------------
  // PAST TALKS
  //
  // Anything marked as upcoming is excluded.
  // All remaining dated talks become part of the archive.
  // ---------------------------------------------------------

  const talksByYear = useMemo(() => {
    const pastTalks = talks.filter(
      (talk) =>
        talk.isUpcoming !== true &&
        Boolean(talk.date)
    );

    return groupTalksByYear(pastTalks);
  }, [talks]);

  // ---------------------------------------------------------
  // YEAR CAROUSEL
  // ---------------------------------------------------------

  const scrollByOne = (year, dir) => {
    const el = scrollerRefs.current[year];

    if (!el) {
      return;
    }

    const firstSlide = el.querySelector(
      `.${styles.slide}`
    );

    const computedStyle =
      window.getComputedStyle(el);

    const gap =
      parseFloat(computedStyle.gap) || 18;

    const step = firstSlide
      ? firstSlide.getBoundingClientRect()
          .width + gap
      : 320;

    const maxLeft =
      el.scrollWidth - el.clientWidth;

    const EPS = 8;

    const atStart =
      el.scrollLeft <= EPS;

    const atEnd =
      el.scrollLeft >= maxLeft - EPS;

    if (dir > 0 && atEnd) {
      el.scrollTo({
        left: 0,
        behavior: "smooth",
      });

      return;
    }

    if (dir < 0 && atStart) {
      el.scrollTo({
        left: maxLeft,
        behavior: "smooth",
      });

      return;
    }

    el.scrollBy({
      left: dir * step,
      behavior: "smooth",
    });
  };

  // ---------------------------------------------------------
  // MODAL
  // ---------------------------------------------------------

  useEffect(() => {
    if (!selectedTalk) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedTalk(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedTalk]);

  return (
    <section
      id="speakers"
      className={styles.section}
    >
      <Container>
        <header className={styles.header}>
          <div className={styles.kicker}>
            {t("kicker")}
          </div>

          <h2 className={styles.title}>
            {t("title")}
          </h2>

          <div className={styles.underline} />
        </header>

        <div
          className={styles.calendarLinkWrap}
        >
          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            className={styles.calendarLink}
          >
            Open Journal Club Calendar
          </a>
        </div>

        {/* ============================================= */}
        {/* UPCOMING */}
        {/* ============================================= */}

        <div className={styles.block}>
          <div className={styles.blockHead}>
            <h3
              className={styles.blockTitle}
            >
              {t("upcomingTitle")}
            </h3>

            <p className={styles.blockSub}>
              {t("upcomingSub")}
            </p>
          </div>

          <div className={styles.feature}>
            <div
              className={styles.featureGrid}
            >
              <div
                className={
                  styles.featurePhoto
                }
              >
                <div
                  className={
                    styles.photoMat
                  }
                >
                  <Image
                    src={upcoming.imageUrl}
                    alt={`${upcoming.title} image`}
                    fill
                    sizes="(max-width: 900px) 60vw, 240px"
                    className={
                      styles.photo
                    }
                  />
                </div>
              </div>

              <div
                className={
                  styles.featureInfo
                }
              >
                <div
                  className={
                    styles.featureName
                  }
                >
                  {upcoming.name}
                </div>

                <div
                  className={
                    styles.featureTalk
                  }
                >
                  {upcoming.title}
                </div>

                <div className={styles.kv}>
                  <div
                    className={styles.k}
                  >
                    {t("date")}:
                  </div>

                  <div
                    className={styles.v}
                  >
                    {upcoming.date}
                  </div>

                  <div
                    className={styles.k}
                  >
                    {t("location")}:
                  </div>

                  <div
                    className={styles.v}
                  >
                    {upcoming.place}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={styles.infoGrid}
            >
              <div
                className={styles.infoBox}
              >
                <h3
                  className={
                    styles.infoTitle
                  }
                >
                  Next Session
                </h3>

                <div
                  className={styles.infoKv}
                >
                  <div
                    className={
                      styles.infoK
                    }
                  >
                    Activity:
                  </div>

                  <div
                    className={
                      styles.infoV
                    }
                  >
                    {upcoming.activity}
                  </div>

                  <div
                    className={
                      styles.infoK
                    }
                  >
                    Title:
                  </div>

                  <div
                    className={
                      styles.infoV
                    }
                  >
                    {upcoming.title}
                  </div>

                  <div
                    className={
                      styles.infoK
                    }
                  >
                    Speaker:
                  </div>

                  <div
                    className={
                      styles.infoV
                    }
                  >
                    {upcoming.speaker}
                  </div>
                </div>
              </div>

              <div
                className={styles.infoBox}
              >
                <h3
                  className={
                    styles.infoTitle
                  }
                >
                  Description
                </h3>

                <div
                  className={styles.descBox}
                >
                  {upcoming.description}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================= */}
        {/* PAST */}
        {/* ============================================= */}

        <div className={styles.block}>
          <div className={styles.blockHead}>
            <h3
              className={styles.blockTitle}
            >
              {t("pastTitle")}
            </h3>

            <p className={styles.blockSub}>
              {t("pastSub")}
            </p>
          </div>

          {sanityError ? (
            <p
              className={styles.errorState}
            >
              The Journal Club archive
              could not be loaded at this
              moment.
            </p>
          ) : talksByYear.length === 0 ? (
            <p
              className={styles.emptyState}
            >
              No past Journal Club talks
              are currently available.
            </p>
          ) : (
            <div
              className={
                styles.yearArchive
              }
            >
              {talksByYear.map(
                ([year, yearTalks]) => {
                  const hasCarousel =
                    yearTalks.length > 3;

                  return (
                    <div
                      className={
                        styles.yearBlock
                      }
                      key={year}
                    >
                      <h4
                        className={
                          styles.yearTitle
                        }
                      >
                        {year}
                      </h4>

                      <div
                        className={
                          styles.carousel
                        }
                      >
                        {hasCarousel && (
                          <button
                            type="button"
                            className={
                              styles.arrowLeft
                            }
                            onClick={() =>
                              scrollByOne(
                                year,
                                -1
                              )
                            }
                            aria-label={`Previous ${year} talks`}
                          >
                            ‹
                          </button>
                        )}

                        <div
                          className={
                            styles.scroller
                          }
                          ref={(node) => {
                            if (node) {
                              scrollerRefs.current[
                                year
                              ] = node;
                            }
                          }}
                        >
                          {yearTalks.map(
                            (talk) => (
                              <div
                                className={
                                  styles.slide
                                }
                                key={
                                  talk._id
                                }
                              >
                                <button
                                  type="button"
                                  className={
                                    styles.posterButton
                                  }
                                  onClick={() =>
                                    setSelectedTalk(
                                      talk
                                    )
                                  }
                                  aria-label={`Open details for ${talk.title}`}
                                >
                                  <div
                                    className={
                                      styles.imgBox
                                    }
                                  >
                                    <Image
                                      src={
                                        talk.posterUrl ||
                                        FALLBACK_PHOTO
                                      }
                                      alt={
                                        talk.title
                                      }
                                      fill
                                      sizes="(max-width: 900px) 80vw, 33vw"
                                      className={
                                        styles.img
                                      }
                                    />
                                  </div>
                                </button>
                              </div>
                            )
                          )}
                        </div>

                        {hasCarousel && (
                          <button
                            type="button"
                            className={
                              styles.arrowRight
                            }
                            onClick={() =>
                              scrollByOne(
                                year,
                                1
                              )
                            }
                            aria-label={`Next ${year} talks`}
                          >
                            ›
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </Container>

      {/* ============================================= */}
      {/* TALK DETAILS MODAL */}
      {/* ============================================= */}

      {selectedTalk && (
        <div
          className={styles.modalBackdrop}
          onClick={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedTalk(null);
            }
          }}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="journal-talk-modal-title"
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() =>
                setSelectedTalk(null)
              }
              aria-label="Close talk details"
            >
              ×
            </button>

            <div
              className={styles.modalGrid}
            >
              <div
                className={
                  styles.modalPosterArea
                }
              >
                <div
                  className={
                    styles.modalPosterWrap
                  }
                >
                  <Image
                    src={
                      selectedTalk.posterUrl ||
                      FALLBACK_PHOTO
                    }
                    alt={
                      selectedTalk.title
                    }
                    fill
                    sizes="(max-width: 760px) 90vw, 420px"
                    className={
                      styles.modalPoster
                    }
                  />
                </div>
              </div>

              <div
                className={
                  styles.modalContent
                }
              >
                <h2
                  id="journal-talk-modal-title"
                  className={
                    styles.modalTitle
                  }
                >
                  {selectedTalk.title}
                </h2>

                <div
                  className={
                    styles.modalSpeaker
                  }
                >
                  {selectedTalk.speaker}
                </div>

                {selectedTalk.affiliation && (
                  <div
                    className={
                      styles.modalAffiliation
                    }
                  >
                    {
                      selectedTalk.affiliation
                    }
                  </div>
                )}

                <div
                  className={
                    styles.modalMeta
                  }
                >
                  <div
                    className={
                      styles.modalMetaRow
                    }
                  >
                    <span
                      className={
                        styles.modalMetaLabel
                      }
                    >
                      Date
                    </span>

                    <span
                      className={
                        styles.modalMetaValue
                      }
                    >
                      {formatDate(
                        selectedTalk.date,
                        locale
                      )}
                    </span>
                  </div>

                  {selectedTalk.time && (
                    <div
                      className={
                        styles.modalMetaRow
                      }
                    >
                      <span
                        className={
                          styles.modalMetaLabel
                        }
                      >
                        Time
                      </span>

                      <span
                        className={
                          styles.modalMetaValue
                        }
                      >
                        {
                          selectedTalk.time
                        }
                      </span>
                    </div>
                  )}

                  {selectedTalk.location && (
                    <div
                      className={
                        styles.modalMetaRow
                      }
                    >
                      <span
                        className={
                          styles.modalMetaLabel
                        }
                      >
                        Location
                      </span>

                      <span
                        className={
                          styles.modalMetaValue
                        }
                      >
                        {
                          selectedTalk.location
                        }
                      </span>
                    </div>
                  )}
                </div>

                {selectedTalk.abstract && (
                  <div
                    className={
                      styles.modalAbstract
                    }
                  >
                    <h3
                      className={
                        styles.modalAbstractTitle
                      }
                    >
                      Abstract
                    </h3>

                    <p
                      className={
                        styles.modalAbstractText
                      }
                    >
                      {
                        selectedTalk.abstract
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}