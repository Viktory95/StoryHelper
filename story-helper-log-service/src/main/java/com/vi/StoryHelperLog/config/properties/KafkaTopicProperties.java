package com.vi.StoryHelperLog.config.properties;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.topics")
@RequiredArgsConstructor
@Data
public class KafkaTopicProperties {
    private String logsTopic;
    private String logsGroupId;
}
