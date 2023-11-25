package springchat.springchat.students;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@Configuration
public class StudentConfigure {
    @Bean
    CommandLineRunner commandLineRunner(
            StudentRepository repository
    ){
        return args ->{

                   Students chantal =new Students(
                            "chantal",
                            "praise",
                            "+250345678",
                            "chantal@gmail.com",
                            "1234567",
                            LocalDate.of(2005, Month.AUGUST,31)

                    );

            Students edouard =new Students(
                    "edouard",
                    "ONlyGod",
                    "+250345678",
                    "edouard@gmail.com",
                    "1234567",
                    LocalDate.of(2003, Month.AUGUST,31)

            );

            Students eric =new Students(
                    "eric",
                    "nsabiyumva",
                    "+250345678",
                    "eric@gmail.com",
                    "1234567",
                    LocalDate.of(2005, Month.AUGUST,31)
            );

            Students jeanine =new Students(
                    "PrayedGod",
                    "jeanine",
                    "+250345678",
                    "jeanine@gmail.com",
                    "1234567",
                    LocalDate.of(2008, Month.AUGUST,31)
            );
            repository.saveAll(
                    List.of(chantal,jeanine,edouard,eric)
            );

        };

    }
}
