package com.tom.hirehelper.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaskRequest {
    private String title;
    private String description;
    private String location;
    private String startTime;
    private String endTime;
    private String picture;
}
