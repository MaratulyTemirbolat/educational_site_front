import TestsList from "@/components/Tests/TestsList/TestsList";

type TestsPageProps = {
  searchParams: {
    page: string | undefined;
  }; 
};

export default function TestsPage({ searchParams: { page } }: TestsPageProps) {
  return (
    <section style={{marginTop: "30px"}}>
      <TestsList page={page? Number(page) : 1}/>
    </section>
  );
};