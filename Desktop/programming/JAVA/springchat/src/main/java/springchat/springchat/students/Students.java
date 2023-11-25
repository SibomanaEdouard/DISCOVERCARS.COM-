package springchat.springchat.students;
import jakarta.persistence.*;

import javax.annotation.processing.Generated;
import java.time.LocalDate;
import java.time.Period;

@Entity
@Table
public class Students {
    @Id
    @SequenceGenerator(
            name="student_sequence",
            sequenceName="student_sequence",
            allocationSize = 1

    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator="student_sequence"
    )
    private Long id;
    private String firstname;
    private String lastname;
    private String phone;
    private String email;
    private String passworrd;
    private LocalDate dob;
    @Transient
    private Integer age;

    public Integer getAge() {
        return Period.between(this.dob,LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Students() {

    }

    public Students(Long id,
                    String firstname,
                    String lastname,
                    String phone,
                    String email,
                    String passworrd,
                    LocalDate dob) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.passworrd = passworrd;
        this.dob = dob;
    }

    public Students(String firstname,
                    String lastname,
                    String phone,
                    String email,
                    String passworrd,
                    LocalDate dob) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.passworrd = passworrd;
        this.dob = dob;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassworrd() {
        return passworrd;
    }

    public void setPassworrd(String passworrd) {
        this.passworrd = passworrd;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }


    @Override
    public String toString() {
        return "Students{" +
                "id=" + id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", passworrd='" + passworrd + '\'' +
                ", dob=" + dob +
                ", age=" + age +
                '}';
    }

}