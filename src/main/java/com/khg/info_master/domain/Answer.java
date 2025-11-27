package com.khg.info_master.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

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

    // Member : Answer = 1 : N
    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    // Question : Answer = 1 : N
    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    // 기술사 답안은 마크다운으로 저장
    @Column(columnDefinition = "TEXT", nullable = false)
    private String answerText;

    private Integer score;    // 선택: 채점 점수
    private String comment;   // 선택: 피드백

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
