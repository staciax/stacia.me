export default async function Page(props: PageProps<'/posts/[slug]'>) {
  const { slug } = await props.params;
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
