import NestedList from "./dashboard-page/NestedList";
import CoursesList from "./dashboard-page/CoursesList";
import StudentIdDataTable from "./admin/utils/StudentIdTable";
import Tabs from "@/components/dashboard-page/Tabs";
import { Box } from "@mui/material";
function MainContent({ currentSelection, studentClass, teacherClass, id }) {
    console.log(id + " MAIN CONTENT")
    return (
      <Box sx={{ marginLeft: "240px", backgroundColor: "white", height: "100%"}}>
        {currentSelection === "Home" && (
          <div>
            <NestedList name="Student Class">
              <CoursesList classData={studentClass} />
            </NestedList>
  
            <NestedList name="Teacher Class">
              <CoursesList classData={teacherClass} />
            </NestedList>
          </div>
        )}
        {currentSelection === "MapID" && <StudentIdDataTable />}
        {currentSelection === "Registered" && <div>Registered Content</div>}
        {currentSelection === "Archived class" && (
          <div>Archived Class Content Here</div>
        )}
        {currentSelection === "Setting" && <div>Settings Content Here</div>}
        {currentSelection === "Tabs" &&  <Tabs classId={id}/>}
      </Box>
    );
  }
  
  export default MainContent;
