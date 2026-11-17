import { useEffect, useState } from "react";
import { ArrowDown, Heart } from "lucide-react";
import CollectionHero from "../components/CollectionHero";
import CollectionItemLink from "../components/CollectionItemLink";
import CollectionPagination from "../components/CollectionPagination";
import CollectionResults from "../components/CollectionResults";
import CollectionSectionHeading from "../components/CollectionSectionHeading";
import {
  getLikedPrayersByCurrentUser,
  getTopLikedPrayers,
} from "../services/likesService";
import { getPrayers } from "../services/prayerService";
import "./Home.css";

const PAGE_SIZE = 20;

function getPrayerItems(response) {
  if (Array.isArray(response)) {
    return { items: response, totalPages: null };
  }

  if (response && typeof response === "object") {
    const items = Array.isArray(response.content)
      ? response.content
      : Array.isArray(response.items)
        ? response.items
        : null;

    if (items) {
      const totalPages = Number.isInteger(response.totalPages)
        ? response.totalPages
        : Number.isFinite(response.totalElements)
          ? Math.ceil(response.totalElements / PAGE_SIZE)
          : null;
      return { items, totalPages };
    }
  }

  throw new Error("The prayer service returned an unexpected response.");
}

export default function Prayers({ userId }) {
  const [page, setPage] = useState(0);
  const [prayerPageResult, setPrayerPageResult] = useState({
    page: null,
    items: [],
    totalPages: null,
    error: null,
  });
  const [topPrayers, setTopPrayers] = useState([]);
  const [topLoading, setTopLoading] = useState(true);
  const [topError, setTopError] = useState(null);
  const [myPrayersResult, setMyPrayersResult] = useState({
    userId: null,
    items: [],
    error: null,
  });

  useEffect(() => {
    let active = true;

    getPrayers({ page, size: PAGE_SIZE })
      .then((response) => {
        const result = getPrayerItems(response);
        if (active) {
          setPrayerPageResult({ page, ...result, error: null });
        }
      })
      .catch((error) => {
        if (active) {
          setPrayerPageResult({
            page,
            items: [],
            totalPages: null,
            error: error.message || "Failed to fetch prayers.",
          });
        }
      })

    return () => {
      active = false;
    };
  }, [page]);

  useEffect(() => {
    let active = true;

    getTopLikedPrayers()
      .then((response) => {
        const result = getPrayerItems(response);
        if (active) setTopPrayers(result.items.slice(0, 10));
      })
      .catch((error) => {
        if (active) {
          setTopError(error.message || "Failed to fetch popular prayers.");
        }
      })
      .finally(() => {
        if (active) setTopLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    if (userId == null) return;

    getLikedPrayersByCurrentUser()
      .then((response) => {
        const result = getPrayerItems(response);
        if (active) {
          setMyPrayersResult({ userId, items: result.items, error: null });
        }
      })
      .catch((error) => {
        if (active) {
          setMyPrayersResult({
            userId,
            items: [],
            error: error.message || "Failed to fetch your liked prayers.",
          });
        }
      })

    return () => {
      active = false;
    };
  }, [userId]);

  const myPrayersLoading =
    userId != null && myPrayersResult.userId !== userId;
  const myPrayers =
    myPrayersResult.userId === userId ? myPrayersResult.items : [];
  const myPrayersError =
    myPrayersResult.userId === userId ? myPrayersResult.error : null;
  const prayersLoading = prayerPageResult.page !== page;
  const prayers = prayersLoading ? [] : prayerPageResult.items;
  const totalPages = prayersLoading ? null : prayerPageResult.totalPages;
  const prayersError = prayersLoading ? null : prayerPageResult.error;
  const hasNextPage =
    totalPages == null
      ? prayers.length === PAGE_SIZE
      : page + 1 < totalPages;

  return (
    <main className="mx-auto w-full max-w-6xl px-2 pb-8 pt-3 text-[#f4e9d2] sm:px-6 sm:pb-12 sm:pt-5 lg:px-8">
      <CollectionHero
        returnTo="/"
        eyebrow="A digital prayer collection"
        tibetanLabel="ཞལ་འདོན་དཔེ་ཆ།"
        title="Find a moment for"
        titleEmphasis="prayer and reflection."
        description="Explore the collection at your own pace, or begin with the prayers most loved by the community."
        artworkLabel="A prayer manuscript resting on warm parchment"
        artworkKicker="Daily reading"
        artworkTibetan="ཞལ་འདོན།"
        artworkFooter="Words to return to"
        floatingIcon={Heart}
        actions={[
          {
            label: "Browse prayers",
            href: "#all-prayers",
            icon: ArrowDown,
            variant: "primary",
          },
          {
            label: "Community favorites",
            href: "#community-favorites",
            icon: Heart,
            variant: "tertiary",
          },
        ]}
      />

      <section
        className="py-8 sm:py-20"
        id="all-prayers"
        aria-labelledby="prayer-list-title"
      >
        <CollectionSectionHeading
          eyebrow="A little more than a library"
          title="Read, remember, return."
          description="Browse the collection in quiet, manageable pages. Choose a prayer to open its reading space."
          id="prayer-list-title"
          sideContent={
            <span className="rounded-full border border-[#eed8b333] bg-[#eed8b30e] px-4 py-2 text-sm text-[#f4e9d2b8]">
              {PAGE_SIZE} prayers per page
            </span>
          }
        />

        <CollectionResults
          loading={prayersLoading}
          loadingMessage="Loading prayers..."
          error={prayersError}
          emptyMessage={prayers.length === 0 ? "No prayers found." : null}
        >
          <>
            <div className="grid gap-3 md:grid-cols-2">
              {prayers.map((prayer, index) => (
                <CollectionItemLink
                  key={prayer.id ?? prayer.number ?? `${prayer.name}-${index}`}
                  to={`/prayer/${prayer.id ?? prayer.number}`}
                  title={prayer.name || "Untitled prayer"}
                />
              ))}
            </div>
            <CollectionPagination
              label="Prayer"
              page={page}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              isLoading={prayersLoading}
              onPageChange={setPage}
            />
          </>
        </CollectionResults>
      </section>

      {userId != null && (
        <section
          className="home-collections border-t border-[#eed8b333] py-8 sm:py-16"
          id="your-liked-prayers"
          aria-labelledby="your-liked-prayers-title"
        >
          <CollectionSectionHeading
            eyebrow="Saved by you"
            title="Prayers you like."
            description="Your favorite prayers, ready to return to."
            id="your-liked-prayers-title"
            className="max-w-2xl"
          />
          <CollectionResults
            loading={myPrayersLoading}
            loadingMessage="Loading your liked prayers..."
            error={myPrayersError}
            emptyMessage={
              myPrayers.length === 0
                ? "You have not liked any prayers yet."
                : null
            }
          >
            <div className="grid gap-3 md:grid-cols-2">
              {myPrayers.map((prayer, index) => (
                <CollectionItemLink
                  key={prayer.id ?? prayer.number ?? `${prayer.name}-${index}`}
                  to={`/prayer/${prayer.id ?? prayer.number}`}
                  title={prayer.name || "Untitled prayer"}
                />
              ))}
            </div>
          </CollectionResults>
        </section>
      )}

      <section
        className="home-collections border-t border-[#eed8b333] py-8 sm:py-16"
        id="community-favorites"
        aria-labelledby="top-prayers-title"
      >
        <CollectionSectionHeading
          eyebrow="Loved by the community"
          title="Prayers to return to."
          description="A few of the words people keep close, gathered in one place."
          id="top-prayers-title"
          className="max-w-2xl"
        />

        <CollectionResults
          loading={topLoading}
          loadingMessage="Loading popular prayers..."
          error={topError}
          emptyMessage={
            topPrayers.length === 0 ? "No popular prayers to show yet." : null
          }
        >
          <div className="grid gap-3 md:grid-cols-2">
            {topPrayers.map((prayer, index) => (
              <CollectionItemLink
                key={prayer.id ?? prayer.number ?? `${prayer.name}-${index}`}
                to={`/prayer/${prayer.id ?? prayer.number}`}
                title={prayer.name || "Untitled prayer"}
                rank={index + 1}
              />
            ))}
          </div>
        </CollectionResults>
      </section>
    </main>
  );
}