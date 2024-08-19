import { Helmet } from "react-helmet";
import EmptyState from "../components/common/EmptyState";

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile | Your Website Name</title>
        <meta
          name="description"
          content="We're working on an exciting new way for you to manage your profile. Check back soon for the latest updates and features."
        />
        <meta
          name="keywords"
          content="profile, user management, account settings, user profile"
        />
        <meta property="og:title" content="Profile | Your Website Name" />
        <meta
          property="og:description"
          content="We're working on an exciting new way for you to manage your profile. Check back soon for the latest updates and features."
        />
        <meta property="og:image" content="URL-to-your-thumbnail-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com/profile" />
      </Helmet>

      <EmptyState
        title="Profile Feature Coming Soon!"
        subtitle="We're working on an exciting new way for you to manage your profile. Stay tuned!"
      />
    </>
  );
};

export default Profile;
