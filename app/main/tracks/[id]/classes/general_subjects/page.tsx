import GeneralSubjectList from "@/components/GeneralSubject/GeneralSubjectList/GeneralSubjectList";

type GeneralSubjectsParams = {
    params: {
        id: number;
    };
    searchParams: {
        classID: string | undefined;
    };
};


export default function GeneralSubjectsPage(
  {
    params: { id },
    searchParams: { classID }
  }: GeneralSubjectsParams
) {
  return (
    <section>
      <GeneralSubjectList trackID={id} classId={classID}/>
    </section>
  );
};