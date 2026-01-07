package com.khg.info_master.domain;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "answer")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "question_id", nullable = false, unique = true)
    private Question question;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String answerText;

    private Integer score;
    private String comment;
}
