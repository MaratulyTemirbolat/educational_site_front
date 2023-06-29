import ClassSubjectList from "@/components/ClassSubject/ClassSubjectList/ClassSubjectList";
import FilterModal from "@/components/ClassSubject/ClassSubjectFilter/ClassSubjectFilter";

type ClassSubjectPageProps = {
  searchParams: {
    page: string | undefined;
    classID: string | undefined;
    genSubjectID: string | undefined;
  };
};

export default async function ClassSubjectsPage(
  { searchParams: {page, classID, genSubjectID} }: ClassSubjectPageProps
) {
  return (
    <section style={{marginTop: "30px"}}>
      <ClassSubjectList
        page={page}
        classID={classID}
        genSubjectID={genSubjectID}
      />
    </section>
  );
};