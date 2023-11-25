package springchat.springchat.students;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;



@Service
public class StudentsService {
    private final StudentRepository studentRepository;
    @Autowired
    public StudentsService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }



    public List<Students> getStudents() {
        System.out.println("All things seems okay");
 return studentRepository.findAll();
    }

    public void addNewStudent(Students students) {
        System.out.println(students);

    }
}
