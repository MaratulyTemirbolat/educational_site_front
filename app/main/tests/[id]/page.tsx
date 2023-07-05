import TestDetail from "@/components/Tests/TestDetail/TestDetail";

type TestPageProps = {
  params: {
    id: number;
  }
};
  
export default function TestPage(
  {
    params: {
      id
    }
  }: TestPageProps
) {
  return (
    <section style={{marginTop: "30px"}}>
        {/* <input type="radio" disabled={true} checked /> */}
        <TestDetail id={id}/>
    </section>
  );
};