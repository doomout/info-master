package com.khg.info_master.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "question_tag")
public class QuestionTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Question : QuestionTag = 1:N
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    // Tag : QuestionTag = 1:N
    @ManyToOne
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;
}
