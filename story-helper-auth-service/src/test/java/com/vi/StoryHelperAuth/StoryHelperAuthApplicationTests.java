package com.vi.StoryHelperAuth;

import com.vi.StoryHelperAuth.config.CassandraConfig;
import com.vi.StoryHelperAuth.config.SecurityConfig;
import com.vi.StoryHelperAuth.repository.UserRepository;
import com.vi.StoryHelperAuth.service.AuthenticationService;
import com.vi.StoryHelperAuth.service.JwtService;
import com.vi.StoryHelperAuth.service.UserService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@SpringBootTest
@Import({CassandraConfig.class, SecurityConfig.class})
class StoryHelperAuthApplicationTests {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationService authenticationService;

	@Autowired
	private JwtService jwtService;

	@Test
	void contextLoads() {
		Assertions.assertThat(userRepository).isNotNull();
		Assertions.assertThat(userService).isNotNull();
		Assertions.assertThat(authenticationService).isNotNull();
		Assertions.assertThat(jwtService).isNotNull();
	}

}
