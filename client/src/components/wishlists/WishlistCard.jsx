import { CloseIcon, HeartIcon } from "../../assets";
import useWishlistAPIs from "../../hooks/useWishlistAPIs";

const WishlistCard = ({ wishlist }) => {
  const { deleteWishlist } = useWishlistAPIs();

  const handleDelete = () => {
    if (wishlist?.id) {
      deleteWishlist({ wishlistId: wishlist.id });
    }
  };

  return (
    <article
      className="relative flex flex-col gap-3 w-full cursor-pointer group"
      role="article"
      aria-labelledby={`wishlist-${wishlist.id}-name`}
    >
      <figure
        className="p-[5px] bg-white shadow-custom-shadow-3 rounded-3xl w-full aspect-square flex items-center justify-center overflow-hidden"
        aria-labelledby={`wishlist-${wishlist.id}-name`}
      >
        {wishlist?.coverImage ? (
          <img
            src={wishlist.coverImage}
            alt={`Cover image of the wishlist titled "${
              wishlist.name || "Untitled Wishlist"
            }"`}
            className="object-cover w-full h-full rounded-3xl"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center rounded-3xl bg-rose-100"
            aria-label={`No image available for wishlist titled "${
              wishlist.name || "Untitled Wishlist"
            }"`}
          >
            <HeartIcon
              className="size-20 text-rose-500"
              aria-label="No image available"
            />
          </div>
        )}
      </figure>

      <figcaption>
        <h3
          id={`wishlist-${wishlist.id}-name`}
          className="text-xl font-semibold"
        >
          {wishlist?.name || "Untitled Wishlist"}
        </h3>
        <span className="text-sm text-gray-600">
          {`${wishlist?.propertyIds?.length || 0} saved`}
        </span>
      </figcaption>

      <button
        onClick={handleDelete}
        className="absolute left-4 top-4 p-[5px] bg-white rounded-full cursor-pointer transition-opacity opacity-0 group-hover:opacity-100"
        aria-label={`Remove wishlist titled "${
          wishlist.name || "Untitled Wishlist"
        }"`}
      >
        <CloseIcon className="size-5" aria-hidden="true" />
      </button>
    </article>
  );
};

export default WishlistCard;
