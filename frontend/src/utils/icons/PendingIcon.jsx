const PendingIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M7 17L18 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6.13153 11C6.13153 11 5.65664 16.6335 6.51155 17.4885C7.36647 18.3434 13 17.8684 13 17.8684"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default PendingIcon;
