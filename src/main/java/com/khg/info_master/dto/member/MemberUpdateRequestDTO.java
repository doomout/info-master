package com.khg.info_master.dto.member;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberUpdateRequestDTO {

    @Email(message = "올바른 이메일 형식이어야 합니다.")
    private String email;      // 수정 가능하도록 허용할지 선택

    @NotBlank(message = "이름은 비어 있을 수 없습니다.")
    private String name;

    @NotBlank(message = "비밀번호는 비어 있을 수 없습니다.")
    private String password;
}
