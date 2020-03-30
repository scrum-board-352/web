const avatarPlaceholder = process.env.PUBLIC_URL + "/img/user.svg";

export default function avatar(url?: string) {
  return url ? url : avatarPlaceholder;
}
