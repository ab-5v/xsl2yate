<xsl:key name="emails" match="/*/emails/email" use="concat(login, '@', domain)"/>
