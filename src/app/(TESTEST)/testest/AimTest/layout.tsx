import Description from './Desciption';

export default function TesTesT({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* @ts-expect-error */}
      <Description />
    </>
  );
}
