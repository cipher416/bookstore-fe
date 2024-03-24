type Props = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: Props) {
  return (
    <div className="flex flex-row items-center justify-center h-dvh">
      {children}
    </div>
  );
}
