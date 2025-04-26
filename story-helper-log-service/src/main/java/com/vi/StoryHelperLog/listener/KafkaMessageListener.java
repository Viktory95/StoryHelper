package com.vi.StoryHelperLog.listener;

import com.vi.StoryHelperLog.config.properties.KafkaTopicProperties;
import com.vi.StoryHelperLog.domain.Log;
import com.vi.StoryHelperLog.repository.LogRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@AllArgsConstructor
public class KafkaMessageListener {

    private final LogRepository logRepository;
    private final KafkaTopicProperties kafkaTopicProperties;

    @Transactional
    @KafkaListener(topics = "#{kafkaTopicProperties.logsTopic}", groupId = "#{kafkaTopicProperties.logsGroupId}", containerFactory = "logKafkaListenerContainerFactory")
    public void listenLog(Log log) {
        logRepository.save(log);
    }
}
