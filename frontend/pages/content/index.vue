<template>
  <v-container>
    <v-row>
      <v-col
        :cols="$device.isDesktop ? 9 : 12"
        :class="
          $vuetify.theme.dark ? 'editor-dark__content' : 'editor-light__content'
        "
      >
        <h1>Content Policy</h1>
        <p>
          Please refer to the following rules when posting or commenting.
        </p>
        <ol>
          <li>
            <span class="font-weight-bold">Follow U.S. law.</span> Posts that
            break United States law are not allowed. This includes but is not
            limited to:
            <ul>
              <li>Copyright law</li>
              <li>
                No selling/distribution of illegal drugs or substances
              </li>
              <li>
                Do not incite, threaten, or glorify violence or other unlawful
                behavior
              </li>
            </ul>
          </li>
          <li>
            <span class="font-weight-bold"
              >No spam (repeatedly posting the same thing, posting meaningless
              or gibberish content).</span
            >
          </li>
          <li>
            <span class="font-weight-bold">No malicious content.</span>
            <ul>
              <li>
                Posts that link to phishing, viruses, etc. are not allowed.
              </li>
              <li>
                Posts that intentionally break or cause bugs on Comet are not
                allowed.
              </li>
              <li>
                <span class="font-weight-bold">URL shorteners</span> are not
                allowed. Comet and its users must be able to see exactly what
                link they are following.
              </li>
            </ul>
          </li>
          <li>
            <span class="font-weight-bold"
              >No doxxing, impersonation, or threatening users.</span
            >
          </li>
          <li>
            <span class="font-weight-bold"
              >Do not share Comet security vulnerabilities.</span
            >
            For the safety of Comet users, please report any security
            vulnerabilities that you find directly to Dan#7457 on
            <a href="https://discord.gg/NPCMGSm">Discord</a>, or email
            <a href="mailto:support@getcomet.net">support@getcomet.net</a>.
          </li>
          <li>
            <span class="font-weight-bold">No pornography.</span> Pornographic
            content does not have a role in our mission of being a platform for
            interesting, productive dicussion. Non-pornographic nudity (i.e.
            art) is allowed.
          </li>
          <li>
            <span class="font-weight-bold">No trolling.</span> Do not post
            meaningless, annoying, or offensive content that worsens the Comet
            experience for everyone else. Just don't be a dick.
          </li>
          <li>
            <span class="font-weight-bold">No inappropriate usernames.</span>
            Includes usernames containing racial slurs or other offensive words.
          </li>
          <li>
            <span class="font-weight-bold"
              >Your post can be removed at Comet's discretion.</span
            >
          </li>
        </ol>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head: {
    title: 'Content Policy'
  }
}
</script>

<style scoped></style>
