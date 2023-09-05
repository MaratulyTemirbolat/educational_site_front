import TopicDetail from "@/components/Topics/TopicDetail/TopicDetail";

type TopicDetailPageProps = {
  params: {
    id: string,
  },
};

export default function TopicDetailPage({
  params: {
    id,
  }
}: TopicDetailPageProps) {
  return (
    <section style={{marginTop: "30px"}}>
      <TopicDetail id={Number(id)}/>
    </section>
  );
};