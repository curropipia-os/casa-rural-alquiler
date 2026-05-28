type Props = { className?: string };

export default function Arrow({ className = "arrow" }: Props) {
  return (
    <svg
      viewBox="0 0 896 1024"
      width="14"
      height="16"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M463.072 951.07l14.142-14.14c9.372-9.372 9.372-24.568 0-33.942L120.226 545.999h751.774c13.254 0 24-10.746 24-24v-20c0-13.254-10.746-24-24-24H120.226L477.214 121.012c9.372-9.372 9.372-24.568 0-33.942l-14.142-14.14c-9.372-9.372-24.568-9.372-33.94 0L27.03 495.03c-9.372 9.372-9.372 24.568 0 33.942l422.102 422.1c9.372 9.372 24.568 9.372 33.94-0.002z"
      />
    </svg>
  );
}
