import { Helmet } from "react-helmet";
import EmptyState from "../components/common/EmptyState";

const Messages = () => {
  return (
    <>
      <Helmet>
        <title>Messages | Your Website Name</title>
        <meta
          name="description"
          content="Stay informed with the latest updates and exciting features coming your way. Check back soon for new messages and announcements."
        />
        <meta
          name="keywords"
          content="messages, notifications, updates, announcements"
        />
        <meta property="og:title" content="Messages | Your Website Name" />
        <meta
          property="og:description"
          content="Stay informed with the latest updates and exciting features coming your way. Check back soon for new messages and announcements."
        />
        <meta property="og:image" content="URL-to-your-thumbnail-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/messages" />
      </Helmet>

      <EmptyState
        title="Exciting Feature on the Way!"
        subtitle="We're working hard to bring you something awesome. Stay tuned!"
      />
    </>
  );
};

export default Messages;
