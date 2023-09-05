import ClassSubjectList from "@/components/ClassSubject/ClassSubjectList/ClassSubjectList";

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
  console.log(classID, genSubjectID)
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