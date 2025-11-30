package com.khg.info_master.dto.member;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@Builder
public class MemberResponseDTO {
    private Long id;
    private String email;
    private String name;
    private LocalDateTime createdAt;
}
