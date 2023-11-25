package springchat.springchat.students;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@RestController
@RequestMapping(path="api/v1/students")
public class StudentsController {
    private final StudentsService studentsService;
    @Autowired
    public StudentsController(StudentsService studentsService) {

        this.studentsService = studentsService;
    }

    @GetMapping()
    public List<Students> getStudents(){
        return studentsService.getStudents();
    }
    @PostMapping()
    public void registerStudent(@RequestBody Students students){
        studentsService.addNewStudent(students);

    }

}
